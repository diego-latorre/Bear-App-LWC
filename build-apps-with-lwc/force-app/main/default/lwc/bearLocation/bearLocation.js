import { LightningElement, api, track, wire } from 'lwc';
//El adapter getRecord permite usar lightning data service para tomar records sin escribir apex
import {getRecord} from 'lightning/uiRecordApi';
const fields = [
    'Bear__c.Name',
    'Bear__c.Location__Latitude__s',
    'Bear__c.Location__Longitude__s'
];

export default class BearLocation extends LightningElement {
    //recordId automaticamente recibe el Id del record actual
    @api recordId;
    @track name;
    @track mapMarkers = [];
    //Con la siguiente notacion se llama al metodo para llamada al metodo pasando como parametro el id y la lista de campos
    //gracias a la notacion, loadBears es llamado automaticamente cuando el componente carga o el record id cambia
    @wire(getRecord, { recordId: '$recordId', fields })
    loadBear({ error, data}){
        if(error){
            //Handle error
        } else if (data){
            //Get bear Data
            this.name = data.fields.Name.value;
            const Latitude = data.fields.Location__Latitude__s.value;
            const Longitude = data.fields.Location__Longitude__s.value;
            //Transformar bear data en map markers
            this.mapMarkers = [{
                location: {Latitude, Longitude},
                title: this.name,
                description: 'Coords: ' + {Latitude} + ', ' + {Longitude}
            }];
        }
    }

    get cardTitle(){
        return (this.name) ? `${this.name}'s location` : 'Bear location';
    }
}