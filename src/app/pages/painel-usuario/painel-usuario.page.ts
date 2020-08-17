import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { PainelUsuario } from 'src/app/Model/painel-usuario';
import { PainelUsuarioService } from './../../services/painel-usuario.service';
import { DetalhesPublicacaoComponent } from 'src/app/components/detalhes-publicacao/detalhes-publicacao.component';
import { AngularFirestore, fromDocRef } from 'angularfire2/firestore';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { DetalhesPainelComponent } from './../../components/detalhes-painel/detalhes-painel.component';
import { Movimentacao } from './../../Model/movimentacao';
import { Publicacao } from './../../Model/publicacao';
import { MovimentacaoService } from './../../services/movimentacao.service';
import { Contagem } from 'src/app/Model/contagem';
import { ContagemService } from './../../services/contagem.service';
import { element } from 'protractor';
import { ContaSistemaService } from 'src/app/services/conta-sistema.service';


@Component({
  selector: 'app-painel-usuario',
  templateUrl: './painel-usuario.page.html',
  styleUrls: ['./painel-usuario.page.scss'],
})
export class PainelUsuarioPage implements OnInit {
  private painelSubscription: Subscription;
  private contagemSubscription: Subscription;
  public userPainel = new Array<PainelUsuario>();
  // public userPainel1 = new Array<PainelUsuario>();
  public publicacao = new Array<Publicacao>();
  public valorPublicacao: number;
  public idPublicacao:string;
  public idPainelUser: string;
  listaPainel: Observable<PainelUsuario[]>
  lista: Observable<PainelUsuario[]>
  // public contagem: any=[];
  public usuarioPainel: PainelUsuario ={};
  public movimentacao: Movimentacao ={}
  private contaSistemaSubscription: Subscription;


  userId: string;
  usuarioContratado: any;
  idMovimentacao: any;
  valorContagem: number=1;
  equipList: any;
  idContaSistema: string;
  contaSistem: import("c:/Users/lau-h/Desktop/appWorkIt-master/src/app/Model/conta-sistema").ContaSistema;
  


  constructor(
    private painelUserService: PainelUsuarioService,
    private db: AngularFirestore,
    private  modalCtrl: ModalController,
    public fbAuth: AngularFireAuth,
    public moviService: MovimentacaoService,
    public AlertCtrl :AlertController,
    private navCtrl: NavController,
    private contagemService: ContagemService,
    private contaSistemaService: ContaSistemaService,

  ) { 

    this.fbAuth.authState.subscribe(user=>{
      if (user){
        this.userId = user.uid;
       
     
      }
      // this.carregaContaSistema();
      this.painelSubscription = this.painelUserService.getPainelUsers().subscribe(data =>{
        this.userPainel= data;
        
        console.log(this.userPainel)
         
       })
    }
    

    )}

  ngOnInit() {
    // this.listarMensagens();
  
  }

  ngOnDestroy() {
    this.painelSubscription.unsubscribe();
  }

// carregaContaSistema(){

//   this.idContaSistema = 'Na5G7dajhmXVj7JeAlIw'
  
//   this.contaSistemaSubscription = this.contaSistemaService.getContaSistema(this.idContaSistema).subscribe(data=>{
//   this.contaSistem = data;
//   console.log(this.contaSistem);
  
//   })
  
// }




  //  iniciaServico(id:string, status: string){

   

  //   // this.valorContagem = this.valorContagem + this.contaSistem.idMovimentacao

  //   this.painelUserService.getPainelUser(id).subscribe(data =>{
  //     this.usuarioPainel = data;
  //     console.log(this.usuarioPainel);
  //     this.usuarioPainel.status=status;
  //     console.log(this.usuarioPainel.status) 
  //     this.movimentacao.valorServico = this.usuarioPainel.valorHora
  //     console.log(this.movimentacao.valorServico)
  //     this.movimentacao.idContratante= this.userId;
  //     this.movimentacao.idContratado = this.usuarioPainel.userId
  //     this.movimentacao.idPublicacao = this.usuarioPainel.idPublicacao
  //     console.log(this.movimentacao.idPublicacao);
  //     this.movimentacao.status = "Em execucao"
  //     this.movimentacao.statusPagamento= "";
  //     this.movimentacao.horaInicio = new Date().getTime();
  //     this.movimentacao.idMovimentacao=0;
  //     this.movimentacao.idMovimentacao = this.contaSistem.idMovimentacao + this.valorContagem;
  //     this.contaSistem.idMovimentacao =this.movimentacao.idMovimentacao;
  //     this.usuarioPainel.idMovimentacao = this.movimentacao.idMovimentacao
      
  //     this.contaSistemaService.updateContaSistema(this.idContaSistema, this.contaSistem);

  //     // this.moviService.addMovimentacao(this.movimentacao)

  //     // this.painelUserService.updatePainelUser(id,this.usuarioPainel); 

      
  //   })

  //          this.alertaSevicoIniciado();
  //         //  this.navCtrl.navigateForward('painel-usuario')    
  


  //   }


 

  excluirUserPainel(status: string, id: string){

    console.log(status);
    if(status == "Em execucao"){
      this.alertafalhaExcluirPaineluser()
    }else{
      this.painelUserService.deletePainelUser(id)
      this.alertaExcluirPaineluser();
    
  }}

  
  async showDetalhesPublicacao(id: string){
    const detalhe = await this.modalCtrl.create({
      // component:DetalhesPublicacaoComponent,
      component:DetalhesPainelComponent,
      cssClass: 'custom-modal-detalhes-publicacao',
      //passando parametro no component modal
      componentProps:{
        id:id
      }
    
    })
    detalhe.present();
    
  }
  async alertafalhaExcluirPaineluser(){
    const alert = await this.AlertCtrl.create({
      header:'Aviso ',
      subHeader:'Serviço em execução',
      message:'Não pode ser excluido no Momento',
      buttons: ['Ok']
    });
    await alert.present();
      }

      async alertaExcluirPaineluser(){
        const alert = await this.AlertCtrl.create({
          header:'Aviso ',
          subHeader:'',
          message:'Serviço excluido com sucesso',
          buttons: ['Ok']
        });
        await alert.present();
          }

          async alertaSevicoIniciado(){
            const alert = await this.AlertCtrl.create({
              header:'Aviso ',
              subHeader:'',
              message:'Servico iniciado com sucesso',
              buttons: ['Ok']
            });
            await alert.present();
              }
          

}
