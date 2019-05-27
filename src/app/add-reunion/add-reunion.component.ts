import { Component, OnInit } from '@angular/core';
import { Reunion } from '../readreunion/reunion';
import { Foto } from '../readreunion/foto';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {Web3Service} from '../util/web3.service';

declare let require: any;
const reunion_artifacts = require('../../../build/contracts/Reuniones.json');

@Component({
  selector: 'app-add-reunion',
  templateUrl: './add-reunion.component.html',
  styleUrls: ['./add-reunion.component.css'],
  providers: [NgbModalConfig]
})
export class AddReunionComponent implements OnInit {

  items: Reunion[];
  fotos : Foto[];
  public isCollapsed = true;
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
    this.fotos = [];
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

  async addReunion(id: string, tema: string, fecha: string){

    if (!this.ReunionCoin) {
       console.log('Metacoin is not loaded, unable to send transaction');
       return;
     }

  	 console.log('add reunion! ');
 	   console.log('Initiating transaction... (please wait)');

	  try {
      const deployedReunionCoin = await this.ReunionCoin.deployed();
      console.log("coin deployed!");
      const reunionCoinTransaction = await deployedReunionCoin.registrarReunion.sendTransaction(id, tema, fecha,{from: this.model.account});
      console.log("transaction ok!");


      if (!reunionCoinTransaction) {
        console.log('Transaction failed!');
      } else {
        console.log('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      console.log("Error Reunion");
      console.log('Error sending coin; see log.');
    }
	}


  async addImage(idReunion:string, idFoto:string, url: string, hash: string){

    console.log("HOLAAAA ADDIMAGE");


    if (!this.ReunionCoin) {
       console.log('Metacoin is not loaded, unable to send transaction');
       return;
     }

  	 console.log('add image! ');
 	   console.log('Initiating transaction... (please wait)');

	  try {
      const deployedReunionCoin = await this.ReunionCoin.deployed();
      const reunionCoinTransaction = await deployedReunionCoin.registrarFoto.sendTransaction(idReunion, hash, url, idFoto,{from: this.model.account});


      if (!reunionCoinTransaction) {
        console.log('Transaction failed!');
      } else {
        console.log('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      console.log("Error Reunion");
      console.log('Error sending coin; see log.');
    }

    (<HTMLInputElement>document.getElementById("inputUrl")).value = '';
    (<HTMLInputElement>document.getElementById("inputHash")).value = '';

    this.isCollapsed = true;
  }
}
