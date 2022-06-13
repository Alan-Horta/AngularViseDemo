# ViseApp - Angular

Proyecto para el Front de SpringViseDemo

## Instrucciones

Usar la ultima version de [Releases](https://github.com/Alan-Horta/AngularViseDemo/releases/tag/test) se necesita colocar en un servidor apache por ejemplo WAMP donde fue probado.
Si no descargar el repository y ejecutar manualmente con angular cli.

### Internationalization

Angular maneja el internationalization por deploy de App, por eso viene el Release con 2 archivos "es-MX" y "en-US", cada uno funciona de manera independiente y manda al Spring un header con "Accept-Language" para la internationalization de Spring

### IP

La IP que viene por default para conectarse a Spring es "http://localhost:8080/api/productos" la cual viene en el archivo main.js del respectivo release, se puede cambiar pero dejando "/api/productos"

# Default

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
