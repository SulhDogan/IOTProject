import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCheckbox, IonLabel, IonNote, IonItem, IonBadge, IonButton, IonRow, IonCol, IonIcon, IonRouterLink, IonRefresher, IonRefresherContent } from '@ionic/react';
import React from 'react';
import { Globals } from '../connection';
import * as icons from "ionicons/icons";

const PageTemperature: React.FC = () => {
  const [temperateState, setTemperateState] = React.useState({ temperate: 0, day: 1, creation: 1 });
  const [weekState, setweekState] = React.useState({ firsttemperate: 0, lasttemperate: 0, avgtemperate: 0, growth: 0 });
  const [monthState, setmonthState] = React.useState({ firsttemperate: 0, lasttemperate: 0, avgtemperate: 0, growth: 0 });
  const [dayState, setdayState] = React.useState({ firsttemperate: 0, lasttemperate: 0, avgtemperate: 0, growth: 0 });
  const [fn, setfn] = React.useState({ init: false });

  var fs = Globals.firestore;
  const temperateStatusLambda = async () => {
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
                setTemperateState({
                  temperate: temperateState.temperate,
                  day: temperateState.day,
                  creation: temperateState.creation,
                });
                break;
              }
              temperateState.temperate = val.get("Temperature");
              setTemperateState({
                temperate: temperateState.temperate,
                day: temperateState.day,
                creation: temperateState.creation,
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
      let daytotaldata=0;
      let daytotalt=0;
      for (let y = 0; y < snap.docs.length; y++) {
        let lastdoc = snap.docs[y];
        daytotalt += lastdoc.get("Temperature");
        daytotaldata++;
      }
      dayState.avgtemperate = daytotalt/daytotaldata;
      totalt+=dayState.avgtemperate;
      if (i == today)
        lastt = dayState.avgtemperate;
      if (i == today - 6) {
        console.log(weekState.avgtemperate);
        console.log(totalt);
        console.log(totaldata);
        weekState.avgtemperate = daytotalt / daytotaldata;
        wfirstt = dayState.avgtemperate;
      }
      if (i == today - 29)
        mfirstt = dayState.avgtemperate;
      weekState.firsttemperate = wfirstt;
      weekState.lasttemperate = lastt;
      weekState.growth = lastt - wfirstt;
      monthState.firsttemperate = mfirstt;
      monthState.lasttemperate = lastt;
      monthState.avgtemperate = totalt / totaldata;
      monthState.growth = lastt - mfirstt;
    }
        setmonthState({
          firsttemperate: monthState.firsttemperate,
          lasttemperate: monthState.lasttemperate,
          avgtemperate: monthState.avgtemperate,
          growth: monthState.lasttemperate - monthState.firsttemperate
        });
    
    setweekState({
      firsttemperate: weekState.firsttemperate,
      lasttemperate: weekState.lasttemperate,
      avgtemperate: weekState.avgtemperate,
      growth: weekState.lasttemperate - weekState.firsttemperate
    });
  };
  if (!fn.init) {
    fn.init = true;
    temperateStatusLambda();
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><IonRouterLink href="/home" color="shade">TeknoKümes</IonRouterLink></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(e) => { temperateStatusLambda(); setTimeout(() => { e.detail.complete(); }, 500); }}>
          <IonRefresherContent>
          </IonRefresherContent>
        </IonRefresher>
        <IonList>
          <IonItem>
            <IonLabel>
              <h1>Kümesin Sıcaklığı : {temperateState.temperate} C</h1>
              <IonNote>Kümesin anlık sıcaklığı</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem>
            <IonBadge color={weekState.growth > 0 ? "success" : "danger"} slot="start" style={{ "fontsize": "20px" }}>
              <IonIcon icon={weekState.growth > 0 ? icons.arrowDropup : icons.arrowDropdown}></IonIcon>
            </IonBadge>
            <IonLabel color="danger">HAFTALIK SICAKLIK ORTALAMASI : {weekState.avgtemperate} C</IonLabel>
          </IonItem>
          <IonItem>
            <IonBadge color={weekState.growth > 0 ? "success" : "danger"} slot="start" style={{ "fontsize": "20px" }}>
              <IonIcon icon={weekState.growth > 0 ? icons.arrowDropup : icons.arrowDropdown}></IonIcon>
            </IonBadge>
            <IonLabel color="success">AYLIK SICAKLIK ORTALAMASI : {monthState.avgtemperate} C</IonLabel>
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
/**
 * <IonItem>
            <IonLabel>
              <h1>Kuluçka Sıcaklığı : 35 C</h1>
              <IonNote>Kuluçkanın anlık sıcaklığı</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem>
            <IonRow>
              <IonCol>
                <IonLabel color="danger">HAFTALIK SICAKLIK ORTALAMASI : 32 C</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel color="success">AYLIK SICAKLIK ORTALAMASI : 27 C</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel color="tertiary">YILLIK SICAKLIK ORTALAMASI : 33 C</IonLabel>
              </IonCol>
            </IonRow>
          </IonItem>
 */
export default PageTemperature;
