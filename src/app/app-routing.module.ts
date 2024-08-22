import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountGuard, AuthenticationGuard } from './core/guards';
import { PageNotFoundComponent } from './features';

const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  {
    path: 'work-space',
    loadChildren: () => import('./features/workspace/workspace.module').then(m => m.WorkspaceModule),
    // canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivate: [ AccountGuard ]
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  { path: '**', redirectTo:'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
