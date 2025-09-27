import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from "./components/header/header";
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Footer } from "./pages/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('loja-virtual');
  showHeader = signal(true);
  
  private router = inject(Router);

  // URLs/rotas que NÃO devem mostrar header
  private readonly routesWithoutHeader = ['/admin', '**'];

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.url;
        
        // Verifica se é uma página não encontrada (qualquer URL que não existe)
        const isNotFoundPage = !this.isKnownRoute(currentUrl);
        
        // Verifica se está na lista de rotas sem header
        const isRouteWithoutHeader = this.routesWithoutHeader.some(route => 
          route === '**' ? false : currentUrl.startsWith(route)
        );
        
        // Esconde header se for NotFound OU se estiver na lista
        const shouldHideHeader = isNotFoundPage || isRouteWithoutHeader;
        this.showHeader.set(!shouldHideHeader);
      });
  }

  private isKnownRoute(url: string): boolean {
    const knownRoutes = [
      '/',
      '/lista-produtos',
      '/detalhe-produto'
    ];
    
    return knownRoutes.some(route => 
      url === route || 
      (route === '/detalhe-produto' && url.startsWith('/detalhe-produto/'))
    );
  }
}
