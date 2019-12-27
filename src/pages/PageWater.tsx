import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCheckbox, IonLabel, IonNote, IonItem, IonBadge, IonButton, IonRow, IonCol, IonIcon, IonRouterLink } from '@ionic/react';
import React from 'react';

const PageWater: React.FC = () => {
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
              <h1>Mevcut Su Miktarı : 20 LT</h1>
              <IonNote>Su Miktarı</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem>
            <IonRow>
              <IonCol>
                <IonLabel color="danger">HAFTALIK SU TÜKETİMİ : 5 LT</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel color="success">AYLIK SU TÜKETİMİ : 10 LT</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel color="tertiary">YILLIK SU TÜKETİMİ : 20 LT</IonLabel>
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

export default PageWater;
