import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCheckbox, IonLabel, IonNote, IonItem, IonBadge, IonButton, IonRow, IonCol, IonIcon, IonRouterLink, IonToggle } from '@ionic/react';
import React from 'react';
import { Globals } from '../connection';
import * as firebase from "firebase";

const Home: React.FC = () => {
  const [doorState, setdoorState] = React.useState({ door: false });
  const [fn, setfn] = React.useState({ init: false });
  var fs = Globals.firestore;
  const doorStatusLambda = async () => 
  {
    fs.collection("NestData").get()
    .then((a) => 
    {
      if (a.docs.length == 0)
      return;
      doorState.door = a.docs[0].get("DoorState");
      setdoorState({
        door: doorState.door,
      });
    })
    
  }

  if (!fn.init) {
    fn.init = true;
    doorStatusLambda();
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><IonRouterLink href="/home" color="shade">TeknoKümes</IonRouterLink></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem href="/food">
            <IonLabel color="warning">
              <h1 >YEM</h1>
              <IonNote>Yem stoğu,kullanımı ve yemlikteki durumu</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem href="/water">
            <IonLabel color="secondary shade">
              <h1>SU</h1>
              <IonNote>Su deposu,kullanımı ve suluktaki durumu</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem href="/temperature">
            <IonLabel color="danger">
              <h1>SICAKLIK</h1>
              <IonNote>Kümes ve kuluçka sıcaklığı</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem href="/humidity">
            <IonLabel color="primary">
              <h1>NEM</h1>
              <IonNote>Kümes nem oranı</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem href="/growing">
            <IonLabel>
              <h1>BÜYÜME</h1>
              <IonNote>Tavuğun büyüme istatistiği</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">- 2 KG -</IonBadge>
          </IonItem>
          <IonItem>
            <IonToggle checked={doorState.door} onIonChange={
              (e) => {
                fs.collection("NestData").doc("0").set({
                  "DoorState": e.detail.checked
                });
              }
            } />
            <IonLabel>Kapı Durumu </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
