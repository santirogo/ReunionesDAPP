import { Component, OnInit } from '@angular/core';
import { Foto } from './foto';
import { Reunion } from './reunion';
import {Web3Service} from '../util/web3.service';

declare let require: any;
const reunion_artifacts = require('../../../build/contracts/Reuniones.json');

@Component({
  selector: 'readreunion',
  templateUrl: './readreunion.component.html',
  styleUrls: ['./readreunion.component.css'],
  providers:[]
})
export class ReadreunionComponent implements OnInit {
  private reunion: Reunion[];
  private fotos:Foto[];
  ReunionCoin: any;
  accounts: string[];

  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  constructor(private web3Service: Web3Service) {
    this.reunion = [];
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

  async readReunion(id:string){
    if (!this.ReunionCoin) {
       console.log('Metacoin is not loaded, unable to send transaction');
       return;
     }

     console.log('add reunion! ');
     console.log('Initiating transaction... (please wait)');

    try {

      const deployedReunionCoin = await this.ReunionCoin.deployed();
      const reunionCoinTransaction = await deployedReunionCoin.buscarReunion.call(id,{from: this.model.account});
      console.log(reunionCoinTransaction);



      let reu = reunionCoinTransaction;

      let r: Reunion = new Reunion(id, reu[0], reu[1], reu[2]);


      console.log("# fotos: "+reu[2]);

      this.reunion[0] = r;



    } catch (e) {
      console.log(e);
      console.log('Error sending coin; see log.');
    }
  }

  async addFoto(idFoto:string,url: string,hash:string){
    if (!this.ReunionCoin) {
       console.log('Metacoin is not loaded, unable to send transaction');
       return;
     }

  	 console.log('add reunion! ');
 	   console.log('Initiating transaction... (please wait)');

	  try {
      const deployedReunionCoin = await this.ReunionCoin.deployed();
      console.log("coin deployed!");
      const reunionCoinTransaction = await deployedReunionCoin.registrarFoto.sendTransaction(this.reunion[0].id, hash, url, idFoto,{from: this.model.account});
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

}
