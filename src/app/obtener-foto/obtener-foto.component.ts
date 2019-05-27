import { Component, OnInit } from '@angular/core';
import { Reunion } from '../readreunion/reunion';
import {Web3Service} from '../util/web3.service';

declare let require: any;
const reunion_artifacts = require('../../../build/contracts/Reuniones.json');

@Component({
  selector: 'app-obtener-foto',
  templateUrl: './obtener-foto.component.html',
  styleUrls: ['./obtener-foto.component.css']
})
export class ObtenerFotoComponent implements OnInit {

  items: Reunion[];
  ReunionCoin: any;
  accounts: string[];

  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  constructor(private web3Service: Web3Service) {
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();

    this.web3Service.artifactsToContract(reunion_artifacts)
      .then((ReunionAbstraction) => {
        this.ReunionCoin = ReunionAbstraction;
        this.ReunionCoin.deployed().then(deployed => {
          console.log(deployed);

        });

      });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }

  async buscarFoto(idFoto: string, idReu: string){

    if (!this.ReunionCoin) {
       console.log('Metacoin is not loaded, unable to send transaction');
       return;
     }

     console.log('add reunion! ');
     console.log('Initiating transaction... (please wait)');

    try {
      const deployedReunionCoin = await this.ReunionCoin.deployed();
      const fotoReunion = await deployedReunionCoin.buscarFoto.call(idReu, idFoto, {from: this.model.account});
      console.log("Foto: ");
      console.log(fotoReunion[0]);

      let print = document.getElementById("resultado");
      print.appendChild(document.createTextNode("resultado: url: "+fotoReunion[0]+", hash: "+fotoReunion[1]));

    } catch (e) {
      console.log(e);
      console.log('Error sending coin; see log.');
    }

  }
}
