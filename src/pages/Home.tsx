import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCheckbox, IonLabel, IonNote, IonItem, IonBadge, IonButton, IonRow, IonCol, IonIcon, IonRouterLink } from '@ionic/react';
import React from 'react';
import { Globals } from '../connection';
import * as firebase from "firebase";

const Home: React.FC = () => {
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
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
