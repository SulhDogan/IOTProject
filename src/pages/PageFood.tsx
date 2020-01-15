import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCheckbox, IonLabel, IonNote, IonItem, IonBadge, IonButton, IonRow, IonCol, IonIcon, IonRouterLink, IonText, IonInput, IonRefresher, IonRefresherContent } from '@ionic/react';
import React, { useState } from 'react';
import { Globals } from '../connection';
import * as icons from "ionicons/icons";

const PageFood: React.FC = () => {
  const [foodState, setFoodState] = React.useState({ food: 0, day: 1, creation: 1 });
  const [weekState, setweekState] = React.useState({ firstfood: 0, lastfood: 0, avgfood: 0, growth: 0 });
  const [monthState, setmonthState] = React.useState({ firstfood: 0, lastfood: 0, avgfood: 0, growth:0 });
  const [dayState, setdayState] = React.useState({ firstfood: 0, lastfood: 0, avgfood: 0, growth: 0 });
  const [fn, setfn] = React.useState({ init: false });

  var fs = Globals.firestore;
  const foodStatusLambda = async () => {
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
                setFoodState({
                  food: foodState.food,
                  day: foodState.day,
                  creation: foodState.creation,
                });
                break;
              }
              foodState.food = val.get("LoadCell2");
              setFoodState({
                food: foodState.food,
                day: foodState.day,
                creation: foodState.creation,
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
        let lastdoc = snap.docs[snap.docs.length - 1];
          totalw += lastdoc.get("LoadCell2");
          if (i == today)
            lastw = lastdoc.get("LoadCell2");
          if (i == today - 6)
          {
            console.log(weekState.avgfood);
            console.log(totalw);
            console.log(totaldata);
            weekState.avgfood = totalw / totaldata;
            wfirstw = lastdoc.get("LoadCell2");
          }
          if (i == today - 29)
            mfirstw = lastdoc.get("LoadCell2");
      }
      weekState.firstfood = wfirstw;
      weekState.lastfood = lastw;
      weekState.growth = lastw - wfirstw;
      setweekState({
        firstfood: weekState.firstfood,
        lastfood: weekState.lastfood,
        avgfood: weekState.avgfood,
        growth: weekState.lastfood - weekState.firstfood
      });
      monthState.firstfood = mfirstw;
      monthState.lastfood = lastw;
      monthState.avgfood = totalw / totaldata;
      monthState.growth = lastw - mfirstw;
      setmonthState({
        firstfood: monthState.firstfood,
        lastfood: monthState.lastfood,
        avgfood: monthState.avgfood,
        growth: monthState.lastfood - monthState.firstfood
      });
  
    };
    if (!fn.init) {
      fn.init = true;
      foodStatusLambda();
    }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><IonRouterLink href="/home" color="shade">TeknoKümes</IonRouterLink></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={(e) => { foodStatusLambda(); setTimeout(() => { e.detail.complete(); }, 500); }}>
          <IonRefresherContent>
          </IonRefresherContent>
        </IonRefresher>
        <IonList>
          <IonItem>
            <IonLabel>
              <h1>Mevcut Yem Miktarı : {foodState.food} g Yem Ağırlığı</h1>
              <IonNote>Su Miktarı</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem>
            <IonBadge color={weekState.growth > 0 ? "success" : "danger"} slot="start" style={{ "fontsize": "20px" }}>
              <IonIcon icon={weekState.growth > 0 ? icons.arrowDropup : icons.arrowDropdown}></IonIcon>
            </IonBadge>
            <IonLabel>
              <h2>Son 7 Gündeki Yem Miktarı Değişimi : {weekState.lastfood - weekState.firstfood} g </h2>
              <IonNote>Son 7 Gündeki Ortalama Yem Miktarı  : {weekState.avgfood} g</IonNote>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonBadge color={monthState.growth > 0 ? "success" : "danger"} slot="start" style={{ "fontsize": "20px" }}>
              <IonIcon icon={monthState.growth > 0 ? icons.arrowDropup : icons.arrowDropdown}></IonIcon>
            </IonBadge>
            <IonLabel>
              <h2>Son 30 Gündeki Yem Miktarı Değişimi : {monthState.lastfood - monthState.firstfood} g </h2>
              <IonNote>Son 30 Gündeki Ortalama Yem Miktarı : {monthState.avgfood} g</IonNote>
            </IonLabel>
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

export default PageFood;
