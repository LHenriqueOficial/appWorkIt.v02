import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams, AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { PublicacaoService } from 'src/app/services/publicacao.service';
import { PainelUsuarioService } from 'src/app/services/painel-usuario.service';
import { Movimentacao } from 'src/app/Model/movimentacao';
import { PainelUsuario } from 'src/app/Model/painel-usuario';
import { Subscription, Observable } from 'rxjs';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import { Usuario } from './../../Model/usuario';
import { ContaUser } from './../../Model/conta-user';
import { ContaUserService } from './../../services/conta-user.service';
import { ContaSistema } from 'src/app/Model/conta-sistema';
import { ContaSistemaService } from 'src/app/services/conta-sistema.service';
import { UsuarioService } from './../../services/usuario.service';
import { CartaoPagamento } from 'src/app/Model/cartao-pagamento';
import { Publicacao } from './../../Model/publicacao';



@Component({
  selector: 'app-detalhes-painel',
  templateUrl: './detalhes-painel.page.html',
  styleUrls: ['./detalhes-painel.page.scss'],
})
export class DetalhesPainelPage implements OnInit {
  idPublicacao: string;
  idUser: any;
  public movi = new Array<Movimentacao>();
  lista: Observable<Movimentacao[]>;
  detalheMovimentacao: Observable<Movimentacao[]>;

  usuario= new Array<Usuario>();
  pagamento:CartaoPagamento={};
  public:Publicacao ={};
  userPainel: PainelUsuario={};
  movimentacao: Movimentacao={};
  contaUser = new Array<ContaUser>();
  contaSistema = new Array<ContaSistema>();
  contaSistem: ContaSistema={};
  conta:ContaUser={};
  idMovimentacao: string;
  horaAtual: number;
  horaDecorrida: any;
  horaInicio: number;
  calculoAtual: any;
  valorServico:number;
  idContradado: string;
  porcentagemSistema: number;

  private publicacaoSubscription: Subscription;
  private painelUserSubscription: Subscription;
  private movimentacaoSubscription: Subscription;
  private contaSubscription: Subscription;
  private contaSistemaSubscription: Subscription;
  private usuarioSubscription : Subscription
  idContaUser: string;
  idPainelUser: any;
  idContaSistema: any;
  texto: string;
  idColecaoUsuario: string;
  codigoValidacao: number;
  cartaPagamento: string;
  dataValidade: string;
  nomeTitular: string;
  numeroCartao: string;
  cpf: string;
  result: string;
  userId: string;
  desabilitaMensagem: boolean = false;
  usuarioPainel: PainelUsuario={};
  valorPublicacao: any;
  publicacao = new Array<Publicacao>();
  valorContagem: number =1;
  tipoPublicacao: any;
  
  // usuario: any;
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private  modalCtrl: ModalController,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private usuarioService: UsuarioService,
    private servicePublicacao: PublicacaoService,
    public AlertCtrl :AlertController,
    private servicePainelUser: PainelUsuarioService,
    private movimentacaoService: MovimentacaoService,
    private contaService: ContaUserService,
    private contaSistemaService: ContaSistemaService,
    private router:  Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private painelUserService: PainelUsuarioService,
    public moviService: MovimentacaoService,
    private navCtrl: NavController,
    private publicService: PublicacaoService,

  ) { 

    this.fbAuth.authState.subscribe(user=>{
      if (user){
        this.userId = user.uid;
      }
      let lista=this.db.collection<Publicacao>("Publicacao")
      lista.ref.where("userId", "==" ,this.userId).get().then(res =>{
       res.forEach(doc => {
        this.publicacao.push(doc.data())
         console.log(doc.id, ' => ' , doc.data())
         this.tipoPublicacao= doc.data().tipoPublicacao
        //  this.valorServico = doc.data().valorServico
       
       })
  
  
      })

    })

  


    this.idPainelUser = this.activatedRoute.snapshot.params['id'];
    console.log(this.idPainelUser);

    this.painelUserSubscription= this.servicePainelUser.getPainelUser(this.idPainelUser).subscribe(data =>{
      this.userPainel = data;
      console.log(this.userPainel)
      this.idContradado = this.userPainel.userId;
      console.log(this.idContradado)
      console.log(this.userId)
      console.log(this.desabilitaMensagem)

      if(this.idContradado === this.userId){
        this.desabilitaMensagem = true;
        console.log(this.desabilitaMensagem)
      }
      if(this.userPainel.status == '')
      {
        console.log("shjhkjshflksjfçsjfçlçl")
      }else{
        
      }
      
    })

   

  }
  
  ngOnInit() {
    this.carregaUser();
    this.carregaContaSistema();
    this.painelUserService.getPainelUser(this.idPainelUser).subscribe(data =>{
      this.usuarioPainel = data;
      console.log(this.usuarioPainel);
      if(this.usuarioPainel.status != ''){
        this.loadMovimentacao();
      }
     
    })

  }
  ngOnDestroy() {
    // this.movimentacaoSubscription.unsubscribe();
  }


  loadMovimentacao(){

    this.userPainel.idUsuariologado;
    this.userPainel.userId;
    this.userPainel.idMovimentacao;
    console.log(this.userPainel.idMovimentacao)

    let lista=this.db.collection<Movimentacao>("Movimentacao")
    lista.ref.where("idMovimentacao", "==" , this.usuarioPainel.idMovimentacao).get().then(res =>{
     res.forEach(doc => {
      this.movi.push(doc.data())
       console.log(doc.id, ' => ' , doc.data())
       this.idMovimentacao= doc.id,
       this.horaInicio = doc.data().horaInicio,
       this.valorServico = doc.data().valorServico
       console.log(this.horaInicio)
     });
     
     this.horaAtual = new Date().getTime()
     console.log(this.horaAtual)
     console.log(this.horaInicio)
     this.horaDecorrida = Number ((this.horaAtual - this.horaInicio)/ 1000 / 60/60 ).toFixed(2)
     console.log(this.horaDecorrida)
     this.calculoAtual = Number (this.horaDecorrida * this.valorServico).toFixed(2);
     console.log(this.calculoAtual);

     this.movimentacaoSubscription = this.movimentacaoService.getMovimentacao(this.idMovimentacao).subscribe(data =>{
       this.movimentacao = data;
       console.log(this.movimentacao.status)
     
      
     })
   })   
  }


  iniciaServico(id:string, status: string){
   
  
      this.usuarioPainel.status=status;
      console.log(this.usuarioPainel.status) 
      this.movimentacao.valorServico = this.usuarioPainel.valorHora
      console.log(this.movimentacao.valorServico)
      this.movimentacao.idContratante= this.userId;
      this.movimentacao.idContratado = this.usuarioPainel.userId
      this.movimentacao.idPublicacao = this.usuarioPainel.idPublicacao
      console.log(this.movimentacao.idPublicacao);
      this.movimentacao.status = "Em execucao"
      this.movimentacao.statusPagamento= "";
      this.movimentacao.horaInicio = new Date().getTime();
      this.movimentacao.idMovimentacao=0;
      this.movimentacao.idMovimentacao = this.contaSistem.idMovimentacao + this.valorContagem;
      this.contaSistem.idMovimentacao =this.movimentacao.idMovimentacao;
      this.usuarioPainel.idMovimentacao = this.movimentacao.idMovimentacao

      this.moviService.addMovimentacao(this.movimentacao)
           this.alertaSevicoIniciado();
           this.navCtrl.navigateForward('painel-usuario')

    this.contaSistemaService.updateContaSistema(this.idContaSistema, this.contaSistem)
    this.painelUserService.updatePainelUser(this.idPainelUser,this.usuarioPainel);


    this.ngOnInit();
    }
  


  rota(id:string){
    // this.fecharModal();
    this.router.navigate(['/mensagens', id])
  }

  listarMovimentacao(){
    this.lista = this.db.collection<Movimentacao>("Movimentacao" , ref =>{
      return ref
    }).valueChanges()/// faz a consulta ser dinamica toda vez que alterar a base de dados altera a view
    this.lista.subscribe(res =>
      {
      this.filtraLista(res)
      })
  }

  filtraLista(res){

    // this.listamensagens =res.filter(t=>(t.de == this.usuarioDe && t.para == this.usuarioPara)|| t.para == this.usuarioDe && t.de == this.usuarioPara ) 
    this.detalheMovimentacao = res.filter(t=>(t.idContratante == this.userPainel.idUsuariologado && t.idContratado == this.idContradado))

    console.log(this.detalheMovimentacao);
    this.detalheMovimentacao
  }



  finalizaMovimentacao(){

    if(this.numeroCartao && this.nomeTitular && this.dataValidade
      && this.cpf && this.codigoValidacao){
        console.log("dados cartao ok ")
        
    this.movimentacao.horaFinal = new Date().getTime();
    this.horaDecorrida =  Number.parseFloat(((this.movimentacao.horaFinal - this.movimentacao.horaInicio)/1000 / 60/60).toFixed(2)) ;
   this.movimentacao.valorPagamento = Number.parseFloat((this.horaDecorrida * this.valorServico).toFixed(2)) 
    this.movimentacao.porcentagemSistema = this.contaSistem.porcentagem;
    this.movimentacao.horasTrabalhadas = this.horaDecorrida;
     console.log(this.movimentacao.valorPagamento);
     this.movimentacao.status = 'Finalizado';
     this.movimentacao.statusPagamento = 'Pendente';
     
     console.log(this.movimentacao.status);
     this.porcentagemSistema  = Number.parseFloat(((this.contaSistem.porcentagem * this.movimentacao.valorPagamento)/ 100).toFixed(2)) ;
     console.log(this.porcentagemSistema);
     this.movimentacao.taxaServico = Number.parseFloat(this.porcentagemSistema.toFixed(2)) ;
        


this.movimentacaoService.updateMovimentacao(this.idMovimentacao, this.movimentacao)
    //  atualiza painel usuario
    this.userPainel.status = 'Finalizado'
    this.servicePainelUser.updatePainelUser(this.idPainelUser,this.userPainel);
    
     this.alertaServicoFinalizado();
    }else{
      console.log("não é possivel efetuar pagamento");
      this.alertaDadosPagamento();
      this.result = "nao validado"
      this.router.navigate(['/dados-financeiros', this.idColecaoUsuario])
    }
   

  }
atualizaSaldoUsuario(){
  let lista=this.db.collection<ContaUser>("ContaUser")
  lista.ref.where("idConta", "==" , this.userPainel.userId).get().then(res =>{
   res.forEach(doc => {
     this.contaUser.push(doc.data())
     console.log(doc.id, ' => ' , doc.data())
     this.idContaUser= doc.id
   });
   this.contaSubscription = this.contaService.getConta(this.idContaUser).subscribe(data =>{
     this.conta = data;
     console.log(this.contaSistem.porcentagem);
    
     this.porcentagemSistema  = Number ((this.contaSistem.porcentagem * this.movimentacao.valorPagamento)/ 100);
     console.log(this.porcentagemSistema)
     let valor: number = this.conta.saldo;
    this.conta.saldo = Number((this.movimentacao.valorPagamento - this.porcentagemSistema) + valor)
    console.log(this.conta.saldo)
     console.log( this.contaSistem.saldo)

     this.atualizaSaldoSistema(this.porcentagemSistema)
   })
 

  // this.contaService.updateConta(this.idContaUser, this.conta)
  })
 
 
}

carregaContaSistema(){
this.idContaSistema = 'Na5G7dajhmXVj7JeAlIw'

this.contaSistemaSubscription = this.contaSistemaService.getContaSistema(this.idContaSistema).subscribe(data=>{
this.contaSistem = data;
console.log(this.contaSistem);

})
  
}

atualizaSaldoSistema(valor: number){
  let saldo = this.contaSistem.saldo
  console.log(this.contaSistem.saldo)
  this.contaSistem.saldo = valor + saldo;

  console.log(this.contaSistem.saldo);

  // this.contaSistemaService.updateContaSistema(this.idContaSistema, this.contaSistem);
}

carregaUser(){
  
  this.fbAuth.authState.subscribe(user=>{
    if (user)
    {
      let uid = user.uid;
      let users=this.db.collection<Usuario>("Usuarios")
      users.ref.where("userId", "==", uid).get().then(result=>{
             result.forEach(doc =>{
               this.usuario.push(doc.data())
               console.log(doc.id, ' => ' , doc.data())
               this.idColecaoUsuario = doc.id
               this.numeroCartao = doc.data().cartaoPagamento.numeroCartao,
               this.codigoValidacao = doc.data().cartaoPagamento.codigoValidacao,
               this.dataValidade = doc.data().cartaoPagamento.dataValidade,
               this.nomeTitular = doc.data().cartaoPagamento.nomeTitular,
               this.cpf = doc.data().cartaoPagamento.cpf,
               
               console.log(this.cartaPagamento)
               console.log("id dacoleção do usuario " + this.idColecaoUsuario)
             }) 
             
          })
    }
  })

}

 async alertaDadosPagamento(){
  const alert = await this.AlertCtrl.create({
    header:'Aviso ',
    subHeader:'',
    message:'Completar dados de Pagamento',
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
    

 
    async alertaServicoFinalizado(){
      const alert = await this.AlertCtrl.create({
        header:'Aviso ',
        subHeader:'',
        message:'Serviço finalizado com Sucesso.',
        buttons: ['Ok']
      });
      await alert.present();
        }


}





