import { NgModule } from '@angular/core';

// básicos de layout/entrada
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MessagesModule } from 'primeng/messages';

// feedback / diálogos
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  exports: [
    ButtonModule,
    TableModule,
    CardModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    InputMaskModule,
    ToastModule,
    ConfirmDialogModule,
    ToolbarModule,
    BreadcrumbModule,
    MessagesModule
  ]
})
export class PrimeNgModule {}
