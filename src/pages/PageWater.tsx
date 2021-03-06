import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCheckbox, IonLabel, IonNote, IonItem, IonBadge, IonButton, IonRow, IonCol, IonIcon, IonRouterLink, IonRefresher, IonRefresherContent } from '@ionic/react';
import React from 'react';
import { Globals } from '../connection';
import * as icons from "ionicons/icons";
import Chart from 'chart.js';

const PageWater: React.FC = () => {
  const [waterState, setWaterState] = React.useState({ water: 0, day: 1, creation: 1 });
  const [weekState, setweekState] = React.useState({ firstwater: 0, lastwater: 0, avgwater: 0, growth: 0 });
  const [monthState, setmonthState] = React.useState({ firstwater: 0, lastwater: 0, avgwater: 0, growth:0 });
  const [dayState, setdayState] = React.useState({ firstwater: 0, lastwater: 0, avgwater: 0, growth: 0 });
  const [fn, setfn] = React.useState({ init: false });

  var fs = Globals.firestore;
  let today = 30;/*new Date().getDate();*/
  let days: string[] = [];
  let grapw: number[] = [];
  for (let i = today; i > today - 30; i--) {
    days.push(i.toString());
  }
  const waterStatusLambda = async () => {
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
                setWaterState({
                  water: waterState.water,
                  day: waterState.day,
                  creation: waterState.creation,
                });
                break;
              }
              waterState.water = val.get("Water");
              setWaterState({
                water: waterState.water,
                day: waterState.day,
                creation: waterState.creation,
              });
            }
          });
      });

      let totalw = 0;
      let totaldata = 0;
      let mfirstw = 0;
      let wfirstw = 0;
      let lastw = 0;
  
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
          daytotalt += lastdoc.get("Water");
          daytotaldata++;
        }
        dayState.avgwater=daytotalt/daytotaldata;
        totalw+=dayState.avgwater;
          if (i == today)
            lastw = dayState.avgwater;
          if (i == today - 6)
          {
            console.log(weekState.avgwater);
            console.log(totalw);
            console.log(totaldata);
            weekState.avgwater = totalw / totaldata;
            wfirstw = dayState.avgwater;
          }
          if (i == today - 29)
            mfirstw = dayState.avgwater;
          grapw.push(totalw / totaldata);
      }
      weekState.firstwater = wfirstw;
      weekState.lastwater = lastw;
      weekState.growth = lastw - wfirstw;
      setweekState({
        firstwater: weekState.firstwater,
        lastwater: weekState.lastwater,
        avgwater: weekState.avgwater,
        growth: weekState.lastwater - weekState.firstwater
      });

      new Chart((document.getElementById("bar-chart") as any).getContext("2d"), {
        type: 'line',
        data: {
          labels: days,
          datasets: [
            {
              label: "mm",
              backgroundColor: ["#19B9CAAA"],
              data: grapw
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Ortalama Su Yüksekliği (mm (milimetre))'
          }
        }
      });
  

      monthState.firstwater = mfirstw;
      monthState.lastwater = lastw;
      monthState.avgwater = totalw / totaldata;
      monthState.growth = lastw - mfirstw;
      setmonthState({
        firstwater: monthState.firstwater,
        lastwater: monthState.lastwater,
        avgwater: monthState.avgwater,
        growth: monthState.lastwater - monthState.firstwater
      });
  
    };
    if (!fn.init) {
      fn.init = true;
      waterStatusLambda();
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><IonRouterLink href="/home" color="shade">TeknoKümes</IonRouterLink></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={(e) => { waterStatusLambda(); setTimeout(() => { e.detail.complete(); }, 500); }}>
          <IonRefresherContent>
          </IonRefresherContent>
        </IonRefresher>
        <IonList>
          <IonItem>
            <IonLabel>
              <h1>Mevcut Su Miktarı : {waterState.water} cm Su Yükseliği</h1>
              <IonNote>Su Miktarı</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem>
            <IonBadge color={weekState.growth > 0 ? "success" : "danger"} slot="start" style={{ "fontsize": "20px" }}>
              <IonIcon icon={weekState.growth > 0 ? icons.arrowDropup : icons.arrowDropdown}></IonIcon>
            </IonBadge>
            <IonLabel>
              <h2>Son 7 Gündeki Su Yükseklik Değişimi : {weekState.lastwater - weekState.firstwater} cm </h2>
              <IonNote>Son 7 Gündeki Ortalama Su Yüksekliği : {weekState.avgwater} cm</IonNote>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonBadge color={monthState.growth > 0 ? "success" : "danger"} slot="start" style={{ "fontsize": "20px" }}>
              <IonIcon icon={monthState.growth > 0 ? icons.arrowDropup : icons.arrowDropdown}></IonIcon>
            </IonBadge>
            <IonLabel>
              <h2>Son 30 Gündeki Su Yükseklik Değişimi : {monthState.lastwater - monthState.firstwater} cm </h2>
              <IonNote>Son 30 Gündeki Ortalama Su Yüksekliği : {monthState.avgwater} cm</IonNote>
            </IonLabel>
          </IonItem>
          <IonItem>
          <canvas id="bar-chart" width="800" height="450"></canvas>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PageWater;
