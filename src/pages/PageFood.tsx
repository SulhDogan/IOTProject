import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCheckbox, IonLabel, IonNote, IonItem, IonBadge, IonButton, IonRow, IonCol, IonIcon, IonRouterLink, IonText, IonInput } from '@ionic/react';
import React from 'react';

const PageFood: React.FC = () => {
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
              <h1>Mevcut Yem Durumu : 20 KG</h1>
              <IonNote>Yem Stoğu</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem>
            <IonRow>
              <IonCol>
                <IonLabel color="danger">HAFTALIK YEM TÜKETİMİ : 5 KG</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel color="success">AYLIK YEM TÜKETİMİ : 10 KG</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel color="tertiary">YILLIK YEM TÜKETİMİ : 20 KG</IonLabel>
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

export default PageFood;
