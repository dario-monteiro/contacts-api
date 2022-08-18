import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { PessoaFisicaModule } from './modules/pessoa-fisica/pessoa-fisica.module';
import { PessoaJuridicaModule } from './modules/pessoa-juridica/pessoa-juridica.module';
import { RelacionamentoModule } from './modules/relacionamento/relacionamento.module';
import { TipoDocumentoModule } from './modules/tipo-documento/tipo-documento.module';
import { APP_FILTER, APP_GUARD, Reflector } from '@nestjs/core';
import { AllExceptionFilter } from './exceptions/all-exception.filter';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes()
    }),
    PessoaFisicaModule,
    PessoaJuridicaModule,
    RelacionamentoModule,
    TipoDocumentoModule,
    AuthModule,
    UsuarioModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    },
    {
      provide: APP_GUARD,
      useFactory: (ref) => new JwtAuthGuard(ref),
      inject: [Reflector]
    }
  ]
})
export class AppModule {}
