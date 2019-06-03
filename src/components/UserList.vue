<template>
<div class="list">
   <md-card>
      <md-card-header>
         <div class="md-title">Mini projeto de Vue/CSS</div>
      </md-card-header>
      <md-card-content>

         <md-empty-state v-if="!contacts.length" md-icon="sentiment_dissatisfied" md-label="Voce nao adicionou nenhum usuário ainda">
            <md-button class="md-mini md-dark m-t-2x md-block" @click="addUserModal = true">Adicionar Usuário</md-button>
         </md-empty-state>

         <md-table v-if="contacts.length">
            <md-table-row>
               <md-table-head md-numeric>#</md-table-head>
               <md-table-head>Nome</md-table-head>
               <md-table-head>Email</md-table-head>
               <md-table-head>Cargo</md-table-head>
               <md-table-head></md-table-head>
            </md-table-row>
            <md-table-row v-for="(contact, index) in contacts" v-bind:key="contact.id">
               <md-table-cell md-numeric>{{index + 1}}</md-table-cell>
               <md-table-cell>{{contact.name}}</md-table-cell>
               <md-table-cell>{{contact.email}}</md-table-cell>
               <md-table-cell>{{contact.office}}</md-table-cell>
               <md-table-cell>
                  <md-button class="md-mini md-dark" @click="showEditUser(contact, index)">Alt</md-button>
                  <md-button class="md-mini md-dark" @click="deleteUser(index)">Delete</md-button>
               </md-table-cell>
            </md-table-row>
         </md-table>

         <md-button v-if="contacts.length" class="md-mini md-dark m-t-2x md-block" @click="addUserModal = true">Adicionar Usuário</md-button>
      </md-card-content>
   </md-card>

   <md-dialog :md-active.sync="editUserModal">
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      <md-dialog-title>Editar usuário #{{id + 1}}</md-dialog-title>
      <md-dialog-content>
         <md-field>
            <label>Nome</label>
            <md-input name="name" v-model="name"></md-input>
         </md-field>
         <md-field>
            <label>E-mail</label>
            <md-input name="email" v-model="email"></md-input>
         </md-field>
         <md-field>
            <label>Cargo</label>
            <md-input name="office" v-model="office"></md-input>
         </md-field>
      </md-dialog-content>

      <md-dialog-actions>
         <div class="md-layout-item md-layout md-gutter">
            <div class="md-layout-item">
               <md-button class="md-warning md-full" @click="editUserModal = false">Cancelar</md-button>
            </div>
            <div class="md-layout-item">
               <md-button class="md-dark md-full" @click="saveEditUser({id, name: name, email: email, office: office})">Gravar</md-button>
            </div>
         </div>
      </md-dialog-actions>
   </md-dialog>

   <md-dialog :md-active.sync="addUserModal">
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      <md-dialog-title>Adicionar usuário</md-dialog-title>
      <md-dialog-content>
         <md-field>
            <label>Nome</label>
            <md-input name="name" v-model="name"></md-input>
         </md-field>
         <md-field>
            <label>E-mail</label>
            <md-input name="email" v-model="email"></md-input>
         </md-field>
         <md-field>
            <label>Cargo</label>
            <md-input name="office" v-model="office"></md-input>
         </md-field>
      </md-dialog-content>
      <md-dialog-actions>
         <div class="md-layout-item md-layout md-gutter">
            <div class="md-layout-item">
               <md-button class="md-warning md-full" @click="addUserModal = false">Cancelar</md-button>
            </div>
            <div class="md-layout-item">
               <md-button class="md-dark md-full" @click="addUser({id, name: name, email: email, office: office})">Gravar</md-button>
            </div>
         </div>
      </md-dialog-actions>
   </md-dialog>
</div>
</template>

<script lang="ts">
import {
   Component,
   Vue,
   Prop
} from "vue-property-decorator";

interface EditCustomer {
   id: number;
   name: string;
   email: string;
   office: string;
}
@Component
export default class UserList extends Vue {
   editUserModal: boolean = false;
   addUserModal: boolean = false;
   sending: boolean = false;
   contacts: Array < any > = [{
         name: "Amanda",
         email: "amanda@mangueira.com.br",
         office: "Jardineira"
      },
      {
         name: "Joao",
         email: "joao@caminhao.com.br",
         office: "Motorista"
      },
      {
         name: "Pedro",
         email: "pedro@pedrera.com.br",
         office: "Geólogo"
      },
      {
         name: "Paulo",
         email: "paulo@paulada.com.br",
         office: "Madereiro",
         id: 3
      },
      {
         name: "Raquel",
         email: "raquel@raqueteira.com.br",
         office: "Tenista"
      }
   ];

   private id: number = 0;
   private name: string = "";
   private email: string = "";
   private office: string = "";

   deleteUser(id: number) {
      this.contacts.splice(id, 1);
   }

   showEditUser(data: EditCustomer, index: number) {
      this.editUserModal = true;
      this.id = index;
      this.name = data.name;
      this.email = data.email;
      this.office = data.office;
   }
   saveEditUser(data: EditCustomer) {
      if (this.contacts[data.id].name != data.name) {
         this.sending = true;
         window.setTimeout(() => {
            this.sending = false;
            this.contacts[data.id].name = data.name;
            this.contacts[data.id].email = data.email;
            this.contacts[data.id].office = data.office;
            this.editUserModal = false;
         }, 1500);
      }
   }
   addUser(data: EditCustomer) {
      if (data.name != '' && data.email != '' && data.office != '') {
         this.sending = true;
         window.setTimeout(() => {
            this.contacts.push({
               name: data.name,
               email: data.email,
               office: data.office,
               id: data.id
            });
            this.addUserModal = false;
         }, 1500);
      }
   }
}
</script>

<style lang="scss" scoped>
/*
   VARS
*/
$color_grey: #2e2e2e;
$color_black: #000000;
$color_red: #e28686;

.md-dialog-content {
   padding-bottom: 0;
}

.md-dialog-actions {
   padding: 8px 24px 15px 24px;
}

.md-table-cell {
   text-align: center;
}

.md-table-head {
   text-align: center;
   color: $color_black;
   font-size: 14px;
   font-weight: 600;
}

.md-table {
   .md-table-row:nth-child(even) .md-table-cell {
      background-color: rgba(0, 0, 0, 0.08);
   }
}

.md-progress-bar {
   position: absolute;
   top: 0;
   right: 0;
   left: 0;
}

/*
   buttons
*/

.md-dark {
   background: $color_grey;
   color: #fff;
   border-radius: 4px;
   height: 39px;
}

.md-full {
   border-radius: 0;
   width: 100%;
}

.md-warning {
   background: $color_red;
   color: #fff;
   height: 39px;
}

.md-mini {
   min-width: inherit;
   height: 30px;
   padding: 0 15px;
   font-size: 11px;
}
</style>
