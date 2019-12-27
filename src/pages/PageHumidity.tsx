import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCheckbox, IonLabel, IonNote, IonItem, IonBadge, IonButton, IonRow, IonCol, IonIcon, IonRouterLink } from '@ionic/react';
import React from 'react';

const PageHumidity: React.FC = () => {
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
              <h1>Mevcut Nem Oranı : %55</h1>
              <IonNote>Kümes Nem Oranı</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="start">DURUM</IonBadge>
          </IonItem>
          <IonItem>
            <IonRow>
              <IonCol>
                <IonLabel color="danger">HAFTALIK NEM ORANI : %55</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel color="success">AYLIK NEM ORANI : %57</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel color="tertiary">YILLIK NEM ORANI : %45</IonLabel>
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

export default PageHumidity;
