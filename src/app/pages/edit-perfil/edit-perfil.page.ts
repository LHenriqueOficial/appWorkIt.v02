import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/Model/usuario';
import { AngularFirestore } from 'angularfire2/firestore';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UsuarioService } from './../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Publicacao } from 'src/app/Model/publicacao';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
})
export class EditPerfilPage implements OnInit {
  nomeUser: any;
  idColecao: string;
 public usuario: Usuario ={}
 public publicacao = new Array<Publicacao>();

  private usuarioSubscription: Subscription;
  id: any;
  quantidadePublicacao: number;

  constructor(
    private router:  Router,
    public fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private navCtrl: NavController,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.id = this.activatedRoute.snapshot.params['id'];
    console.log("teste id parametro "+ this.id)
    if (this.id) this.loadUser();

   }

  ngOnInit() {
    this.carregaPublicacoes();
  }

  ngOnDestroy() {
    this.usuarioSubscription.unsubscribe();
  }

  loadUser() {
    this.usuarioSubscription = this.usuarioService.getUsuario(this.id).subscribe(data => {
      this.usuario = data;
      console.log(this.usuario);
    });
  }

  showScreen(nomeDaPagina: string){
    this.navCtrl.navigateForward(nomeDaPagina);
  }

  logOut(){
    this.fbAuth.auth.signOut();
    this.router.navigateByUrl('login')
  }

  rota(nomeDaPagina:string){
    this.router.navigate([nomeDaPagina, this.id])
  
  }

  carregaPublicacoes() {
    let lista=this.db.collection<Publicacao>("Publicacao")
   
     lista.ref.orderBy("dataPublicacao", "desc" ).get().then(res =>{
      
      res.forEach(doc => {
        this.publicacao.push(doc.data())
        console.log(doc.id, ' => ' , doc.data())
        this.quantidadePublicacao =this.publicacao.length;
        console.log(this.quantidadePublicacao);
        // console.log("id publicação " + this.idPublicacao)  
      });
    })

  }
  

}
