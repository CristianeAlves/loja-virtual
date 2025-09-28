import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { Produto } from '../../../models/produto.interface';
import { ProdutosService } from '../../../services/produtos-service';
import { Button } from "primeng/button";


interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
  selector: 'app-manage-products',
  imports: [TableModule, Dialog, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, RadioButton, InputTextModule, FormsModule, InputNumber, IconFieldModule, InputIconModule, Button],
  providers: [MessageService, ConfirmationService, ProdutosService],
  templateUrl: './manage-products.html',
  styleUrl: './manage-products.scss'
})
export class ManageProducts implements OnInit{

   productDialog: boolean = false;

    produtos: Produto[] = [];

    produto!: Produto;

    selectedProducts!: Produto[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    cols!: Column[];

    exportColumns!: ExportColumn[];

    constructor(
        private produtoService: ProdutosService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}


    ngOnInit() {
        this.loadDemoData();
    }
    
    loadDemoData() {
        this.produtoService.getAllProdutos().subscribe((data: Produto[]) => {
          console.log('Produtos carregados:', data); // Log para verificar os dados recebidos
            this.produtos = data;
            this.cd.markForCheck();
        });

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    openNew() {
        this.produto = {} as Produto;
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(produto: Produto) {
        this.produto = { ...produto };
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'No',
                severity: 'secondary',
                variant: 'text'
            },
            acceptButtonProps: {
                severity: 'danger',
                label: 'Yes'
            },
            accept: () => {
                this.produtos = this.produtos.filter((val) => !this.selectedProducts?.includes(val));
                this.selectedProducts = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(produto: Produto) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + produto.title + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'No',
                severity: 'secondary',
                variant: 'text'
            },
            acceptButtonProps: {
                severity: 'danger',
                label: 'Yes'
            },
            accept: () => {
                this.produtos = this.produtos.filter((val) => val.id !== produto.id);
                this.produto = {} as Produto;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.produtos.length; i++) {
            if (this.produtos[i].id === Number(id)) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = '0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default: return 'info';
        }
    }

    saveProduct() {
        this.submitted = true;

        if (this.produto.title?.trim()) {
            if (this.produto.id) {
                this.produtos[this.findIndexById(this.produto.id.toString())] = this.produto;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.produto.id = Number(this.createId());
                this.produto.image = 'product-placeholder.svg';
                this.produtos.push(this.produto);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
            }

            this.produtos = [...this.produtos];
            this.productDialog = false;
            this.produto = {} as Produto;
        }
    }

}
