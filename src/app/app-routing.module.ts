import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guards/auth.guard';
import { LoggerGuard } from './services/guards/logger.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'login',canActivate:[LoggerGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'inicial',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/inicial/inicial.module').then( m => m.InicialPageModule)
  },
  {
    path: 'edit-perfil/:id',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/edit-perfil/edit-perfil.module').then( m => m.EditPerfilPageModule)
  },
  {
    path: 'edit-perfil',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/edit-perfil/edit-perfil.module').then( m => m.EditPerfilPageModule)
  },
  {
    path: 'perfil-pessoal/:id',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/perfil-pessoal/perfil-pessoal.module').then( m => m.PerfilPessoalPageModule)
  },
  {
    path: 'perfil-pessoal',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/perfil-pessoal/perfil-pessoal.module').then( m => m.PerfilPessoalPageModule)
  },
  {
    path: 'perfil-profissional/:id',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/perfil-profissional/perfil-profissional.module').then( m => m.PerfilProfissionalPageModule)
  },
  {
    path: 'perfil-profissional',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/perfil-profissional/perfil-profissional.module').then( m => m.PerfilProfissionalPageModule)
  },
  {
    path: 'dados-financeiros/:id/:idUserPainel',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/dados-financeiros/dados-financeiros.module').then( m => m.DadosFinanceirosPageModule)
  },
  {
    path: 'dados-financeiros/:id',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/dados-financeiros/dados-financeiros.module').then( m => m.DadosFinanceirosPageModule)
  },
  {
    path: 'dados-financeiros',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/dados-financeiros/dados-financeiros.module').then( m => m.DadosFinanceirosPageModule)
  },
  {
    path: 'teste/:id',
    loadChildren: () => import('./pages/teste/teste.module').then( m => m.TestePageModule)
  },
  {
    path: 'teste',
    loadChildren: () => import('./pages/teste/teste.module').then( m => m.TestePageModule)
  },

  {
    path: 'atualizacao',
    loadChildren: () => import('./pages/atualizacao/atualizacao.module').then( m => m.AtualizacaoPageModule)
  },
  {
    path: 'mensagens',
    loadChildren: () => import('./pages/mensagens/mensagens.module').then( m => m.MensagensPageModule)
  },
  {
    path: 'mensagens/:id',
    loadChildren: () => import('./pages/mensagens/mensagens.module').then( m => m.MensagensPageModule)
  },
  {
    path: 'painel-usuario',
    loadChildren: () => import('./pages/painel-usuario/painel-usuario.module').then( m => m.PainelUsuarioPageModule)
  },
  {
    path: 'detalhes-painel',
    loadChildren: () => import('./pages/detalhes-painel/detalhes-painel.module').then( m => m.DetalhesPainelPageModule)
  },
  {
    path: 'detalhes-painel/:id',
    loadChildren: () => import('./pages/detalhes-painel/detalhes-painel.module').then( m => m.DetalhesPainelPageModule)
  },
  {
    path: 'pagamentos',
    loadChildren: () => import('./pages/pagamentos/pagamentos.module').then( m => m.PagamentosPageModule)
  },
  {
    path: 'pagamentos/:id',
    loadChildren: () => import('./pages/pagamentos/pagamentos.module').then( m => m.PagamentosPageModule)
  },
  {
    path: 'relatorio-movimentacao',
    loadChildren: () => import('./pages/relatorio-movimentacao/relatorio-movimentacao.module').then( m => m.RelatorioMovimentacaoPageModule)
  },
  {
    path: 'relatorios-sistema',
    loadChildren: () => import('./pages/relatorios-sistema/relatorios-sistema.module').then( m => m.RelatoriosSistemaPageModule)
  },
  {
    path: 'menssagens-usuario',
    loadChildren: () => import('./pages/menssagens-usuario/menssagens-usuario.module').then( m => m.MenssagensUsuarioPageModule)
  },
  {
    path: 'publicacao',
    loadChildren: () => import('./pages/publicacao/publicacao.module').then( m => m.PublicacaoPageModule)
  },
 
 
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
