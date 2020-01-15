import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCheckbox, IonLabel, IonNote, IonItem, IonBadge, IonButton, IonRow, IonCol, IonIcon, IonRouterLink, IonRefresher, IonRefresherContent } from '@ionic/react';
import React from 'react';
import { Globals } from '../connection';
import * as icons from "ionicons/icons";

const PageHumidity: React.FC = () => {
  const [humidityState, setHumidityState] = React.useState({ humidity: 0, day: 1, creation: 1 });
  const [weekState, setweekState] = React.useState({ firsthumidity: 0, lasthumidity: 0, avghumidity: 0, growth: 0 });
  const [monthState, setmonthState] = React.useState({ firsthumidity: 0, lasthumidity: 0, avghumidity: 0, growth: 0 });
  const [dayState, setdayState] = React.useState({ firsthumidity: 0, lasthumidity: 0, avghumidity: 0, growth: 0 });
  const [fn, setfn] = React.useState({ init: false });

  var fs = Globals.firestore;
  const humidityStatusLambda = async () => {
    let col = fs.collection("SensorData");
    let day = -1;
    col.orderBy('Day', 'desc').orderBy('Creation', 'asc').limit(1).get()
      .then((v) => {
        if (v.docs.length == 0)
          return;
        day = v.docs[0].get("Day");
      })
      .then(() => {
        if (day == -1)
          return;
        col.where("Day", "==", day).orderBy('Creation', 'asc').get()
          .then((ld) => {
            for (let i = 0; i < ld.docs.length; i++) {
              let val = ld.docs[i];
              if (i == ld.docs.length - 1) {
                setHumidityState({
                  humidity: humidityState.humidity,
                  day: humidityState.day,
                  creation: humidityState.creation,
                });
                break;
              }
              humidityState.humidity = val.get("Humidity");
              setHumidityState({
                humidity: humidityState.humidity,
                day: humidityState.day,
                creation: humidityState.creation,
              });
            }
          });
      });
    let totalt = 0;
    let totaldata = 0;
    let mfirstt = 0;
    let wfirstt = 0;
    let lastt = 0;
    let today = 30;/*new Date().getDate();*/
    for (let i = today; i > today - 30; i--) {
      totaldata++;
      const snap = await col.where("Day", "==", i).orderBy('Creation', "asc").get();
      if (snap.docs.length == 0)
        break;
      let daytotaldata = 0;
      let daytotalt = 0;
      for (let y = 0; y < snap.docs.length; y++) {
        let lastdoc = snap.docs[y];
        daytotalt += lastdoc.get("Humidity");
        daytotaldata++;
      }
      dayState.avghumidity = daytotalt / daytotaldata;
      totalt += dayState.avghumidity;
      if (i == today)
        lastt = dayState.avghumidity;
      if (i == today - 6) {
        console.log(weekState.avghumidity);
        console.log(totalt);
        console.log(totaldata);
        weekState.avghumidity = daytotalt / daytotaldata;
        wfirstt = dayState.avghumidity;
      }
      if (i == today - 29)
        mfirstt = dayState.avghumidity;
      weekState.firsthumidity = wfirstt;
      weekState.lasthumidity = lastt;
      weekState.growth = lastt - wfirstt;
      monthState.firsthumidity = mfirstt;
      monthState.lasthumidity = lastt;
      monthState.avghumidity = totalt / totaldata;
      monthState.growth = lastt - mfirstt;
    }
    setmonthState({
      firsthumidity: monthState.firsthumidity,
      lasthumidity: monthState.lasthumidity,
      avghumidity: monthState.avghumidity,
      growth: monthState.lasthumidity - monthState.firsthumidity
    });

    setweekState({
      firsthumidity: weekState.firsthumidity,
      lasthumidity: weekState.lasthumidity,
      avghumidity: weekState.avghumidity,
      growth: weekState.lasthumidity - weekState.firsthumidity
    });
  };
  if (!fn.init) {
    fn.init = true;
    humidityStatusLambda();
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><IonRouterLink href="/home" color="shade">TeknoKümes</IonRouterLink></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(e) => { humidityStatusLambda(); setTimeout(() => { e.detail.complete(); }, 500); }}>
          <IonRefresherContent>
          </IonRefresherContent>
        </IonRefresher>
        <IonList>
          <IonItem>
            <IonLabel>
              <h1>Mevcut Nem Oranı : % {humidityState.humidity}</h1>
              <IonNote>Kümes Nem Oranı</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem>
            <IonBadge color={weekState.growth > 0 ? "success" : "danger"} slot="start" style={{ "fontsize": "20px" }}>
              <IonIcon icon={weekState.growth > 0 ? icons.arrowDropup : icons.arrowDropdown}></IonIcon>
            </IonBadge>
            <IonLabel color="danger">HAFTALIK NEM ORTALAMASI : % {weekState.avghumidity} </IonLabel>
          </IonItem>
          <IonItem>
            <IonBadge color={weekState.growth > 0 ? "success" : "danger"} slot="start" style={{ "fontsize": "20px" }}>
              <IonIcon icon={weekState.growth > 0 ? icons.arrowDropup : icons.arrowDropdown}></IonIcon>
            </IonBadge>
            <IonLabel color="success">AYLIK SICAKLIK ORTALAMASI : % {monthState.avghumidity}</IonLabel>
          </IonItem>
          <IonItem>
            /** GRAFİK BURAYA GELECEK */
          </IonItem>
        </IonList>
        <IonRow>
          <IonCol>
            <IonButton expand="block" color="success">Test</IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand="block" color="danger"><IonIcon name="trash"></IonIcon></IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default PageHumidity;
