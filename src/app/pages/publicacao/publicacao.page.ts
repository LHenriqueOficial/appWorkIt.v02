import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publicacao } from 'src/app/Model/publicacao';
import { Profissao } from 'src/app/Model/profissao';
import { Formacao } from 'src/app/Model/formacao';
import { Usuario } from 'src/app/Model/usuario';
import { NavController, AlertController, NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PublicacaoService } from 'src/app/services/publicacao.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.page.html',
  styleUrls: ['./publicacao.page.scss'],
})
export class PublicacaoPage implements OnInit {
  descricao: any;
  tipoPublicacao:string;
  nomeUser: string;
  sobreNome: string;
  profissao: string;
  idColecao: string;
  usuario:any=[];
  user:Usuario={}
  formacao: Formacao={};
  prof: Profissao={};
  areaAtuacao: any;
  experiencia: any;
  userId: string;
  dadosPublicacao: Publicacao={};
  public publicacao: Publicacao={};
  colecao= new Array<Publicacao>();
  private publicacaoSubscription: Subscription;
  private usuarioSubscription: Subscription;
  
  // public ordem = new Array<Ordem>();
  dadosAtualizacao: string;
  id: any;
  valorHora: any;
  statusProfissao: string;
  statusPessoal: string;
  valor: boolean = false;


  constructor(
    private  modalCtrl: ModalController,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private servicePublicacao: PublicacaoService,
    private serviceUsuario: UsuarioService,
    // public navParams: NavParams,
    public AlertCtrl :AlertController,
    private router:  Router,
    private navCtrl: NavController,
  ) {
    // this.dadosAtualizacao= navParams.get('id')
    this.fbAuth.authState.subscribe(user=>{
      if (user)
      {
       this.userId = user.uid;

      }
      this.carregaUser();
      this.carregaPublicacao();
    })
   }

  ngOnInit() {
  }

  carregaUser(){

    let users=this.db.collection<Usuario>("Usuarios")
    users.ref.where("userId", "==", this.userId).get().then(result=>{
           result.forEach(doc =>{
             this.usuario.push(doc.data())
             console.log(doc.id, ' => ' , doc.data())
             this.nomeUser = doc.data().nome,
              console.log(this.nomeUser)
             this.sobreNome = doc.data().sobrenome,
             this.profissao = doc.data().profissao?.descricao,
             this.areaAtuacao = doc.data().profissao?.areaAtuacao,
             this.experiencia = doc.data().profissao?.tempoExperiencia
             this.idColecao = doc.id
             console.log("id dacoleção do usuario " + this.idColecao)
        
           }) 
          
           console.log("id dacoleção do usuario " + this.idColecao)
      })
    
  }
  
  carregaPublicacao(){
        let users=this.db.collection<Publicacao>("Publicacao")
        users.ref.where("userId", "==", this.userId).get().then(result=>{
               result.forEach(doc =>{
                 this.colecao.push(doc.data())
                 console.log(doc.id, ' => ' , doc.data())
                 console.log(this.colecao)
                 this.tipoPublicacao = doc.data().tipoPublicacao,
                 this.valorHora = doc.data().valorHora,
                 console.log(this.valorHora)
                 console.log(this.tipoPublicacao)
                 this.idColecao = doc.id
                 console.log("id dacoleção do usuario " + this.idColecao)
               })
               if (this.tipoPublicacao == null ){
                this.valor = true;
                console.log(this.valor)

              }else{
                this.publicacaoSubscription= this.servicePublicacao.getPublicacao(this.idColecao).subscribe(data =>{
                this.dadosPublicacao = data
               
                console.log(this.publicacao)
              })
                  
              }
             
          })
   
  }
  
  
  async salvaPublicacao(){
  
    let users=this.db.collection<Publicacao>("Publicacao")
    users.ref.where("idUser", "==", this.userId).get().then(async result=>{
           result.forEach(doc =>{
             this.colecao.push(doc.data())
             console.log(doc.id, ' => ' , doc.data())
             this.idColecao = doc.id,
             this.id = doc.data().userId
             console.log(this.idColecao);
           })
  
           if(this.colecao.length > 0){
             
  console.log("updade alteracao de valor" + this.publicacao.valorHora)
            this.publicacao.tipoPublicacao = this.dadosPublicacao.tipoPublicacao;
            this.publicacao.valorHora = this.dadosPublicacao.valorHora;
            this.publicacao.descricao = this.dadosPublicacao.descricao;

            this.servicePublicacao.updatePublicacao(this.idColecao, this.publicacao)
         this.PublicacaoAtualizada();

          }else {
            console.log("nova publicacao")
            this.publicacao.userId = this.userId;
            this.publicacao.dataPublicacao = new Date().getTime();
            console.log(this.publicacao.valorHora)
            await this.servicePublicacao.addPublicacao(this.publicacao);
            this.PublicacaoConcluido();
          }

  this.navCtrl.navigateForward('inicial')
      }) 
      
  }

  async deletePublicacaoConcluido(){
    const alert = await this.AlertCtrl.create({
      header:'Aviso',
      subHeader:'Publicação excuida com Sucesso ',
      // message: '<img src="/assets/img/engrenagem-100.png" />',
      buttons: ['Ok'],
      
    });

    await alert.present();
      }


      async PublicacaoConcluido(){
        const alert = await this.AlertCtrl.create({
          header:'Aviso',
          subHeader:'Publicação feita com Sucesso ',
          // message: '<img src="/assets/img/engrenagem-100.png" />',
          buttons: ['Ok'],
          
        });
    
        await alert.present();
          }

          async PublicacaoAtualizada(){
            const alert = await this.AlertCtrl.create({
              header:'Aviso',
              subHeader:'Publicação Atualizado com Sucesso ',
              // message: '<img src="/assets/img/engrenagem-100.png" />',
              buttons: ['Ok'],
              
            });
        
            await alert.present();
              }

  
      excluirPublicacao(){
        
        let users=this.db.collection<Publicacao>("Publicacao")
        users.ref.where("idUser", "==", this.userId).get().then(async result=>{
               result.forEach(doc =>{
                 this.colecao.push(doc.data())
                 console.log(doc.id, ' => ' , doc.data())
                 this.idColecao = doc.id
          
               })
      
               if(this.colecao.length > 0){
                this.servicePublicacao.deletePublicacao(this.idColecao);
                this.deletePublicacaoConcluido();
               
              }else {
                
              }
    
      this.navCtrl.navigateForward('inicial')
          }) 
      }



}
