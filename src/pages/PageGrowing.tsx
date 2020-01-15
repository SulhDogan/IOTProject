import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCheckbox, IonLabel, IonNote, IonItem, IonBadge, IonButton, IonRow, IonCol, IonIcon, IonRouterLink, IonRefresher, IonRefresherContent } from '@ionic/react';
import React, { useEffect, Component } from 'react';
import { Globals } from '../connection';
import * as icons from "ionicons/icons";

const PageGrowing: React.FC = () => {
  const [chickenState, setChickenState] = React.useState({ weight: 0, onnest: false, day: 1, creation: 1 });
  const [weekState, setweekState] = React.useState({ firstweight: 0, lastweight: 0, avgweight: 0, growth: 0 });
  const [monthState, setmonthState] = React.useState({ firstweight: 0, lastweight: 0, avgweight: 0, growth:0 });
  const [fn, setfn] = React.useState({ init: false });

  var fs = Globals.firestore;
  const chickenStatusLambda = async () => {
    let col = fs.collection("ChickenStatus");
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
              if (i == ld.docs.length - 1 && val.get("OnNest") == false) {
                chickenState.onnest = false;
                setChickenState({
                  weight: chickenState.weight,
                  onnest: chickenState.onnest,
                  day: chickenState.day,
                  creation: chickenState.creation,
                });
                break;
              }
              chickenState.weight = val.get("Weight");
              chickenState.onnest = val.get("OnNest");
              setChickenState({
                weight: chickenState.weight,
                onnest: chickenState.onnest,
                day: chickenState.day,
                creation: chickenState.creation,
              });
            }
          });
      });
      /*
    let totalw = 0;
    let totaldata = 0;
    let firstw = 0;
    let lastw = 0;

    let today = new Date().getDate();
    for (let i = today; i > today - 7; i--) {
      totaldata++;
      const snap = await col.where("Day", "==", i).orderBy('Creation', "asc").get();
      if (snap.docs.length == 0)
        break;
      let lastdoc = snap.docs[snap.docs.length - 1];
      if (lastdoc.get("OnNest")) {
        totalw += lastdoc.get("Weight");
        if (i == today)
          lastw = lastdoc.get("Weight");
        if (i == today - 6)
          firstw = lastdoc.get("Weight");
      }
      else {
        lastdoc = snap.docs[snap.docs.length - 2];
        totalw += lastdoc.get("Weight");
        if (i == today)
          lastw = lastdoc.get("Weight");
        if (i == today - 6)
          firstw = lastdoc.get("Weight");
      }
    }
    weekState.firstweight = firstw;
    weekState.lastweight = lastw;
    weekState.avgweight = totalw / totaldata;
    weekState.growth = lastw - firstw;
    setweekState({
      firstweight: weekState.firstweight,
      lastweight: weekState.lastweight,
      avgweight: weekState.avgweight,
      growth: weekState.lastweight - weekState.firstweight
    });*/
    /* aylık denem */
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
      if (lastdoc.get("OnNest")) {
        totalw += lastdoc.get("Weight");
        if (i == today)
          lastw = lastdoc.get("Weight");
        if (i == today - 6)
        {
          console.log(weekState.avgweight);
          console.log(totalw);
          console.log(totaldata);
          weekState.avgweight = totalw / totaldata;
          wfirstw = lastdoc.get("Weight");
        }
        if (i == today - 29)
          mfirstw = lastdoc.get("Weight");
      }
      else {
        lastdoc = snap.docs[snap.docs.length - 2];
        totalw += lastdoc.get("Weight");
        if (i == today)
          lastw = lastdoc.get("Weight");
        if (i == today - 6)
        {
          console.log(weekState.avgweight);
          console.log(totalw);
          console.log(totaldata);
          weekState.avgweight = totalw / totaldata;
          wfirstw = lastdoc.get("Weight");
        }
        if (i == today - 29)
          mfirstw = lastdoc.get("Weight");
      }
    }
    weekState.firstweight = wfirstw;
    weekState.lastweight = lastw;
    weekState.growth = lastw - wfirstw;
    setweekState({
      firstweight: weekState.firstweight,
      lastweight: weekState.lastweight,
      avgweight: weekState.avgweight,
      growth: weekState.lastweight - weekState.firstweight
    });
    monthState.firstweight = mfirstw;
    monthState.lastweight = lastw;
    monthState.avgweight = totalw / totaldata;
    monthState.growth = lastw - mfirstw;
    setmonthState({
      firstweight: monthState.firstweight,
      lastweight: monthState.lastweight,
      avgweight: monthState.avgweight,
      growth: monthState.lastweight - monthState.firstweight
    });

  };
  if (!fn.init) {
    fn.init = true;
    chickenStatusLambda();
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><IonRouterLink href="/home" color="shade">TeknoKümes</IonRouterLink></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(e) => { chickenStatusLambda(); setTimeout(() => { e.detail.complete(); }, 500); }}>
          <IonRefresherContent>
          </IonRefresherContent>
        </IonRefresher>
        <IonList>
          <IonItem>
            <IonLabel>
              <h1>Mevcut Ağırlığı : {chickenState.weight} GR</h1>
              <IonNote>Tavuk ağırlığı</IonNote>
            </IonLabel>
            <IonBadge color={chickenState.onnest ? "success" : "danger"} slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem>
            <IonBadge color={weekState.growth > 0 ? "success" : "danger"} slot="start" style={{ "fontsize": "20px" }}>
              <IonIcon icon={weekState.growth > 0 ? icons.arrowDropup : icons.arrowDropdown}></IonIcon>
            </IonBadge>
            <IonLabel>
              <h2>Son 7 Gündeki Ağırlık Değişimi : {weekState.lastweight - weekState.firstweight} GR </h2>
              <IonNote>Son 7 Gündeki Ortalama Ağırlık : {weekState.avgweight} GR</IonNote>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonBadge color={monthState.growth > 0 ? "success" : "danger"} slot="start" style={{ "fontsize": "20px" }}>
              <IonIcon icon={monthState.growth > 0 ? icons.arrowDropup : icons.arrowDropdown}></IonIcon>
            </IonBadge>
            <IonLabel>
              <h2>Son 30 Gündeki Ağırlık Değişimi : {monthState.lastweight - monthState.firstweight} GR </h2>
              <IonNote>Son 30 Gündeki Ortalama Ağırlık : {monthState.avgweight} GR</IonNote>
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
            <IonButton expand="block" color="danger">ÇIKIŞ</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default PageGrowing;
