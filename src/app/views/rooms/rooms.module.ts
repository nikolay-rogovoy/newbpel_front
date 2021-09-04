import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AtGridModule } from '../../components/at-grid/at-grid-module';
import { TemplateProviderModule } from '../../lib/template-provider-component/template-provider-module';
import { BathrobeEditComponent } from './bathrobe-edit/bathrobe-edit.component';
import { BathrobesSelectComponent } from './bathrobes-select/bathrobes-select.component';
import { BathrobesComponent } from './bathrobes/bathrobes.component';
import { BathroomEditComponent } from './bathroom-edit/bathroom-edit.component';
import { BathroomsSelectComponent } from './bathroom-select/bathrooms-select.component';
import { BathroomsComponent } from './bathrooms/bathrooms.component';
import { BedEditComponent } from './bed-edit/bed-edit.component';
import { BedsSelectComponent } from './bed-select/beds-select.component';
import { BedsComponent } from './beds/beds.component';
import { ExtrabedEditComponent } from './extrabed-edit/extrabed-edit.component';
import { ExtrabedsSelectComponent } from './extrabeds-select/extrabeds-select.component';
import { ExtrabedsComponent } from './extrabeds/extrabeds.component';
import { ExtraroomEditComponent } from './extraroom-edit/extraroom-edit.component';
import { ExtraroomsSelectComponent } from './extrarooms-select/extrarooms-select.component';
import { ExtraroomsComponent } from './extrarooms/extrarooms.component';
import { FridgeEditComponent } from './fridge-edit/fridge-edit.component';
import { FridgesSelectComponent } from './fridges-select/fridges-select.component';
import { FridgesComponent } from './fridges/fridges.component';
import { HygienekitEditComponent } from './hygienekit-edit/hygienekit-edit.component';
import { HygienekitsSelectComponent } from './hygienekits-select/hygienekits-select.component';
import { HygienekitsComponent } from './hygienekits/hygienekits.component';
import { InternetEditComponent } from './internet-edit/internet-edit.component';
import { InternetsSelectComponent } from './internets-select/internets-select.component';
import { InternetsComponent } from './internets/internets.component';
import { IronEditComponent } from './iron-edit/iron-edit.component';
import { IronsSelectComponent } from './irons-select/irons-select.component';
import { IronsComponent } from './irons/irons.component';
import { KitchenEditComponent } from './kitchen-edit/kitchen-edit.component';
import { KitchensSelectComponent } from './kitchens-select/kitchens-select.component';
import { KitchensComponent } from './kitchens/kitchens.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomtypeEditComponent } from './roomtype-edit/roomtype-edit.component';
import { RoomtypesComponent } from './roomtype/roomtypes.component';
import { RoomtypesSelectComponent } from './roomtypes-select/roomtypes-select.component';
import { SafeEditComponent } from './safe-edit/safe-edit.component';
import { SafesSelectComponent } from './safes-select/safes-select.component';
import { SafesComponent } from './safes/safes.component';
import { TempcontrolEditComponent } from './tempcontrol-edit/tempcontrol-edit.component';
import { TempcontrolsSelectComponent } from './tempcontrols-select/tempcontrols-select.component';
import { TempcontrolsComponent } from './tempcontrols/tempcontrols.component';
import { TvEditComponent } from './tv-edit/tv-edit.component';
import { TvsSelectComponent } from './tvs-select/tvs-select.component';
import { TvsComponent } from './tvs/tvs.component';

@NgModule({
  imports: [
    CommonModule,
    RoomsRoutingModule,
    AtGridModule,
    ReactiveFormsModule,
    TemplateProviderModule,
  ],
  declarations: [
    BathrobeEditComponent,
    BathrobesComponent,
    BathrobesSelectComponent,

    BathroomEditComponent,
    BathroomsComponent,
    BathroomsSelectComponent,

    BedEditComponent,
    BedsComponent,
    BedsSelectComponent,

    ExtrabedEditComponent,
    ExtrabedsComponent,
    ExtrabedsSelectComponent,

    FridgeEditComponent,
    FridgesComponent,
    FridgesSelectComponent,

    HygienekitEditComponent,
    HygienekitsComponent,
    HygienekitsSelectComponent,

    InternetEditComponent,
    InternetsComponent,
    InternetsSelectComponent,

    IronEditComponent,
    IronsComponent,
    IronsSelectComponent,

    KitchenEditComponent,
    KitchensComponent,
    KitchensSelectComponent,

    RoomtypeEditComponent,
    RoomtypesComponent,
    RoomtypesSelectComponent,

    SafeEditComponent,
    SafesComponent,
    SafesSelectComponent,

    TempcontrolEditComponent,
    TempcontrolsComponent,
    TempcontrolsSelectComponent,

    TvEditComponent,
    TvsComponent,
    TvsSelectComponent,

    ExtraroomEditComponent,
    ExtraroomsComponent,
    ExtraroomsSelectComponent,

    RoomsComponent,
    RoomEditComponent,
  ],
  entryComponents: [
    BathrobesSelectComponent,
    BathroomsSelectComponent,
    BedsSelectComponent,
    ExtrabedsSelectComponent,
    FridgesSelectComponent,
    HygienekitsSelectComponent,
    InternetsSelectComponent,
    IronsSelectComponent,
    KitchensSelectComponent,
    RoomtypesSelectComponent,
    SafesSelectComponent,
    TempcontrolsSelectComponent,
    TvsSelectComponent,
    ExtraroomsSelectComponent,
  ]
})
export class RoomsModule { }
