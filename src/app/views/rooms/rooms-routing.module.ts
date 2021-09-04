import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckSaveGuard } from '../../lib/check-save-guard';
import { BathrobeEditComponent } from './bathrobe-edit/bathrobe-edit.component';
import { BathrobesComponent } from './bathrobes/bathrobes.component';
import { BathroomEditComponent } from './bathroom-edit/bathroom-edit.component';
import { BathroomsComponent } from './bathrooms/bathrooms.component';
import { BedEditComponent } from './bed-edit/bed-edit.component';
import { BedsComponent } from './beds/beds.component';
import { ExtrabedEditComponent } from './extrabed-edit/extrabed-edit.component';
import { ExtrabedsComponent } from './extrabeds/extrabeds.component';
import { ExtraroomEditComponent } from './extraroom-edit/extraroom-edit.component';
import { ExtraroomsComponent } from './extrarooms/extrarooms.component';
import { FridgeEditComponent } from './fridge-edit/fridge-edit.component';
import { FridgesComponent } from './fridges/fridges.component';
import { HygienekitEditComponent } from './hygienekit-edit/hygienekit-edit.component';
import { HygienekitsComponent } from './hygienekits/hygienekits.component';
import { InternetEditComponent } from './internet-edit/internet-edit.component';
import { InternetsComponent } from './internets/internets.component';
import { IronEditComponent } from './iron-edit/iron-edit.component';
import { IronsComponent } from './irons/irons.component';
import { KitchenEditComponent } from './kitchen-edit/kitchen-edit.component';
import { KitchensComponent } from './kitchens/kitchens.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomtypeEditComponent } from './roomtype-edit/roomtype-edit.component';
import { RoomtypesComponent } from './roomtype/roomtypes.component';
import { SafeEditComponent } from './safe-edit/safe-edit.component';
import { SafesComponent } from './safes/safes.component';
import { TempcontrolEditComponent } from './tempcontrol-edit/tempcontrol-edit.component';
import { TempcontrolsComponent } from './tempcontrols/tempcontrols.component';
import { TvEditComponent } from './tv-edit/tv-edit.component';
import { TvsComponent } from './tvs/tvs.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Room'
    },
    children: [
      { path: 'bathrobes', component: BathrobesComponent, data: { title: 'Bathrobes' } },
      { path: 'bathrobe/:id', component: BathrobeEditComponent, data: { title: 'Bathrobe' }, canDeactivate: [CheckSaveGuard] },

      { path: 'bathrooms', component: BathroomsComponent, data: { title: 'Bathrooms' } },
      { path: 'bathroom/:id', component: BathroomEditComponent, data: { title: 'Bathroom' }, canDeactivate: [CheckSaveGuard] },

      { path: 'beds', component: BedsComponent, data: { title: 'Beds' } },
      { path: 'bed/:id', component: BedEditComponent, data: { title: 'Bed' }, canDeactivate: [CheckSaveGuard] },

      { path: 'extrabeds', component: ExtrabedsComponent, data: { title: 'Extrabeds' } },
      { path: 'extrabed/:id', component: ExtrabedEditComponent, data: { title: 'Extrabed' }, canDeactivate: [CheckSaveGuard] },

      { path: 'fridges', component: FridgesComponent, data: { title: 'Fridges' } },
      { path: 'fridge/:id', component: FridgeEditComponent, data: { title: 'Fridge' }, canDeactivate: [CheckSaveGuard] },

      { path: 'hygienekits', component: HygienekitsComponent, data: { title: 'Hygienekits' } },
      { path: 'hygienekit/:id', component: HygienekitEditComponent, data: { title: 'Hygienekit' }, canDeactivate: [CheckSaveGuard] },

      { path: 'internets', component: InternetsComponent, data: { title: 'Internets' } },
      { path: 'internet/:id', component: InternetEditComponent, data: { title: 'Internet' }, canDeactivate: [CheckSaveGuard] },

      { path: 'irons', component: IronsComponent, data: { title: 'Irons' } },
      { path: 'iron/:id', component: IronEditComponent, data: { title: 'Iron' }, canDeactivate: [CheckSaveGuard] },

      { path: 'kitchens', component: KitchensComponent, data: { title: 'Kitchens' } },
      { path: 'kitchen/:id', component: KitchenEditComponent, data: { title: 'Kitchen' }, canDeactivate: [CheckSaveGuard] },

      { path: 'roomtypes', component: RoomtypesComponent, data: { title: 'Roomtypes' } },
      { path: 'roomtype/:id', component: RoomtypeEditComponent, data: { title: 'Roomtype' }, canDeactivate: [CheckSaveGuard] },

      { path: 'safes', component: SafesComponent, data: { title: 'Safes' } },
      { path: 'safe/:id', component: SafeEditComponent, data: { title: 'Safe' }, canDeactivate: [CheckSaveGuard] },

      { path: 'tempcontrols', component: TempcontrolsComponent, data: { title: 'Tempcontrols' } },
      { path: 'tempcontrol/:id', component: TempcontrolEditComponent, data: { title: 'Tempcontrol' }, canDeactivate: [CheckSaveGuard] },

      { path: 'tvs', component: TvsComponent, data: { title: 'Tvs' } },
      { path: 'tv/:id', component: TvEditComponent, data: { title: 'Tv' }, canDeactivate: [CheckSaveGuard] },

      { path: 'extrarooms', component: ExtraroomsComponent, data: { title: 'Extrarooms' } },
      { path: 'extraroom/:id', component: ExtraroomEditComponent, data: { title: 'Extraroom' }, canDeactivate: [CheckSaveGuard] },

      { path: 'rooms', component: RoomsComponent, data: { title: 'Rooms' } },
      { path: 'room/:id', component: RoomEditComponent, data: { title: 'Room' }, canDeactivate: [CheckSaveGuard] },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
