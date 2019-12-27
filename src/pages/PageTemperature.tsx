import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCheckbox, IonLabel, IonNote, IonItem, IonBadge, IonButton, IonRow, IonCol, IonIcon, IonRouterLink } from '@ionic/react';
import React from 'react';

const PageTemperature: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><IonRouterLink href="/home" color="shade">TeknoKümes</IonRouterLink></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>
              <h1>Kümesin Sıcaklığı : 30 C</h1>
              <IonNote>Kümesin anlık sıcaklığı</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem>
            <IonRow>
              <IonCol>
                <IonLabel color="danger">HAFTALIK SICAKLIK ORTALAMASI : 30 C</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel color="success">AYLIK SICAKLIK ORTALAMASI : 25 C</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel color="tertiary">YILLIK SICAKLIK ORTALAMASI : 30 C</IonLabel>
              </IonCol>
            </IonRow>
          </IonItem>
          <IonItem>
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

export default PageTemperature;
