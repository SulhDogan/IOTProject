import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCheckbox, IonLabel, IonNote, IonItem, IonBadge, IonButton, IonRow, IonCol, IonIcon, IonRouterLink } from '@ionic/react';
import React from 'react';

const PageGrowing: React.FC = () => {
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
              <h1>Mevcut Ağırlığı : 2 KG</h1>
              <IonNote>Tavuk ağırlığı</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem>
            <IonRow>
              <IonCol>
                <IonLabel color="danger">HAFTALIK AĞIRLIK DEĞİŞİMİ : 2 KG</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel color="success">AYLIK AĞIRLIK DEĞİŞİMİ : 5 KG</IonLabel>
              </IonCol>
            </IonRow>
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
