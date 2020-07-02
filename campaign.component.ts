import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { MatProgressBarModule, MatProgressSpinnerModule, MatDialog, } from '@angular/material';
import { DataService } from '../../../../core/services/data.service';
import { GeneralPopupService } from '../../../../core/services/general-popup.service';
import { environment } from '../../../../../environments/environment';
import { Customizelabel, CustomizeValidation } from '../../../../shared/InterfaceClasses/Customizelabel';
import { CampaignService } from '../../services/CampaignServices';
import { SearchControlComponent } from '../../../../shared/components/searchControl/search-control'
import { CampaignType, Currencycls, Countrycls, Citycls, Industrytypecls, Industrycls, Designationcls, ContactPersoncls, SalesOwnerPersoncls, OppoCreatedBycls, productcls, OpportunityClassificationcls, ContactPersonGridCls } from '../../Campaign.module';

@Component({
    selector: 'app-campaign',
    templateUrl: './campaign.component.html',
    styleUrls: ['./campaign.component.css'],
    providers: [CampaignService]
})

export class CampaignComponent implements OnInit {

    objAssesCriteriaList;
    gridLoad;
    Indusrtyid;
    Designationid;
    Personid;
    SalesOwnerPersonid;
    Productid;
    ContactPersonid;
    

    Customizelabels: Customizelabel[];
    CampTyp: CampaignType[];
    Currency: Currencycls[];
    countries: Countrycls[];
    cities= [];
    IndusrtyType= [];
    Indusrty= [];
    Designation= [];
    ContactPerson=[];
    SalesOwnerPerson: SalesOwnerPersoncls[];
    OppoCreatedBy: OppoCreatedBycls[];
    Product: productcls[];
    OpporClassification: OpportunityClassificationcls[];
    ContactPersonGrid: ContactPersonGridCls[];

    showGrid: boolean = true;

    //for multislect dropdown
    ddlSetuptsDetailSelected = [];
    selectedcities = [];
    selectedindustrytype = [];
    selectedindusrty = [];
    selectedDesignation = [];
    selectedcontactperson = [];
    selectedsalesowner = [];
    selectedOppoCreatedby;
    selectedOppoClassif;
    ddlSetupsDetail = [
        {
            id: '1',
            itemName: 'Value 1'
        }, {
            id: '2',
            itemName: 'Value 2'
        }, {
            id: '3',
            itemName: 'Value 3'
        }, {
            id: '4',
            itemName: 'Value 4'
        }, {
            id: '5',
            itemName: 'Value 5'
        }, {
            id: '6',
            itemName: 'Value 6'
        }, {
            id: '7',
            itemName: 'Value 7'
        }, {
            id: '8',
            itemName: 'Value 8'
        }
    ];
    multiselectSettings = {};
    //for multislect dropdown


    ///for grid pagintion///
    pdata: any[];
    filter: any;
    result: any;
    filtervalue: any;
    abc: Array<string> = [''];
    arrayperPage: any[] = [5, 10, 20, 50, 100, 500];
    perpageModel: any = this.arrayperPage[4];
    p: number = 1;
    itemPerPage: any = '10';
    strListTotalItems: any;
    ///for grid pagintion///

    selectedDropDown: selectedDropDownsValue = new selectedDropDownsValue();




    constructor(
        private dialog: MatDialog,
        private _userService: DataService,
        public _service: CampaignService,
        private formBuilder: FormBuilder

    ) { }




    ngOnInit() {
        debugger;

        this.loadLabels();
        this.multiselectSettings = {
            singleSelection: false,
            selectAllText: 'All',
            unSelectAllText: 'All',
            badgeShowLimit: 0,
            enableSearchFilter: true

        };
    
        this._service.BindDropDownsOfCampaign().subscribe(data => {
            debugger;
            this.CampTyp = data.lstCampaign;
            this.Currency = data.lstCurrency;
            this.countries = data.lstCountry;
            this.cities = data.lstCities;
            this.IndusrtyType = data.lstIndustryType;
            this.Indusrty = data.lstDdlIndustry;
            this.Designation = data.lstDdlDesignation;
            this.ContactPerson = data.lstContactPerson_Campaign;
            this.SalesOwnerPerson = data.lstDdlSalesOwnerPerson;
            this.OppoCreatedBy = data.lstOpportunityCreatedBy;
            this.Product = data.lstProduct;
            this.OpporClassification = data.lstOpportunityClassification;
            //console.log(this.cities);
            

            //for (let obj of this.cities) {
            //    this.selectedcities.push({ id: obj.id, itemName: obj.itemName });
            //}

            this.selectedcities = this.ShowAllMultiSelectValues(this.cities);
            this.selectedindustrytype = this.ShowAllMultiSelectValues(this.IndusrtyType);
            this.selectedindusrty = this.ShowAllMultiSelectValues(this.Indusrty);
            this.selectedDesignation = this.ShowAllMultiSelectValues(this.Designation);
            this.selectedcontactperson = this.ShowAllMultiSelectValues(this.ContactPerson);
            this.selectedsalesowner = this.ShowAllMultiSelectValues(this.SalesOwnerPerson);
            this.selectedOppoCreatedby = this.ShowAllMultiSelectValues(this.OppoCreatedBy);
            this.selectedOppoClassif = this.ShowAllMultiSelectValues(this.OpporClassification);
          
                
            
            
        });
        this.FilterbyIds();

    }

    ShowAllMultiSelectValues(array) {
        let _returnArray = [];
        for (let obj of array) {
            _returnArray.push({ id: obj.id, itemName: obj.itemName });
        }
        return _returnArray;
    }

    ///for grid pagintion///
    eventHandler(w) {
        if (w.keyCode == 13) {
            //this.gridLoad();

            //     this.test = 1;
        }
    }

    ///for grid pagintion///

  

    onCountryChange(countryid) {
        debugger;
        this._service.getCity(countryid).subscribe(
            data => {
                console.log(data)
                this.cities = data

                this.selectedcities = this.ShowAllMultiSelectValues(this.cities);
            });

    }


    GetCommaSeperatedcities(Cityid) {
        debugger;
        this.selectedDropDown.cityid = Cityid.values;
        //this.cityid;
        this.selectedDropDown.countryid;
        this._service.getIndustrytype(Cityid.values, this.selectedDropDown.countryid).subscribe(
            data => {
                console.log(data)
                this.IndusrtyType = data

                this.selectedindustrytype = this.ShowAllMultiSelectValues(this.IndusrtyType);

            });
    }


    GetCommaSeperatedindustrytypes(indtypeid) {
        debugger;
        this.selectedDropDown.IndusrtyTypeid = indtypeid.values;
       

        //for (let i: any = 0; i < this.cityid.length; i++) {
        //    this.selectedDropDown.cityid = this.cityid[0].id;
        //}


        this._service.getindustry(this.selectedDropDown.IndusrtyTypeid, this.selectedDropDown.countryid, this.selectedDropDown.cityid).subscribe(
            data => {
                debugger;
                console.log(data)
                this.Indusrty = data
            });

        this.selectedindusrty = this.ShowAllMultiSelectValues(this.Indusrty);

       }



    onIndustryChange(industId) {
        debugger;
        this.selectedDropDown.Indusrtyid = industId.values;
        //this.selectedDropDown.Designationid = industId.values;


        if (this.selectedDropDown.Designationid == 'undefined' || this.selectedDropDown.Designationid == '' || this.selectedDropDown.Designationid == null) {

            this.selectedDropDown.Designationid = "0";
        }
        if (this.selectedDropDown.ContactPersonid == 'undefined' || this.selectedDropDown.ContactPersonid == '' || this.selectedDropDown.ContactPersonid == null) {

            this.selectedDropDown.ContactPersonid = "0";
        }
        if (this.selectedDropDown.SalesOwnerPersonid == 'undefined' || this.selectedDropDown.SalesOwnerPersonid == '' || this.selectedDropDown.SalesOwnerPersonid == null) {

            this.selectedDropDown.SalesOwnerPersonid = "0";
        }
        if (this.selectedDropDown.OppoCreatedByid == 'undefined' || this.selectedDropDown.OppoCreatedByid == '' || this.selectedDropDown.OppoCreatedByid == null) {

            this.selectedDropDown.OppoCreatedByid = "0";
        }
        if (this.selectedDropDown.Productid == 'undefined' || this.selectedDropDown.Productid == '' || this.selectedDropDown.Productid == null) {

            this.selectedDropDown.Productid = "0";
        }
        if (this.selectedDropDown.OpporClassificationid == 'undefined' || this.selectedDropDown.OpporClassificationid == '' || this.selectedDropDown.OpporClassificationid == null) {

            this.selectedDropDown.OpporClassificationid = "0";
        }
        if (this.selectedDropDown.cityid == 'undefined' || this.selectedDropDown.cityid == '' || this.selectedDropDown.cityid == null) {

            this.selectedDropDown.cityid = "0";
        }
        debugger;
        this._service.getDesignation(this.selectedDropDown.Indusrtyid, this.selectedDropDown.IndusrtyTypeid, this.selectedDropDown.countryid, this.selectedDropDown.cityid).subscribe(
            data => {
                console.log(data)
                this.Designation = data
            });      
        debugger;
        this._service.getContactPerson(this.selectedDropDown.Indusrtyid, this.selectedDropDown.IndusrtyTypeid, this.selectedDropDown.countryid, this.selectedDropDown.cityid, this.selectedDropDown.Designationid).subscribe(
            data => {
                console.log(data)
                this.ContactPerson = data
            });

        this._service.getSalesOwner(this.selectedDropDown.Indusrtyid, this.selectedDropDown.IndusrtyTypeid, this.selectedDropDown.countryid, this.selectedDropDown.cityid, this.selectedDropDown.Designationid, this.selectedDropDown.ContactPersonid).subscribe(
            data => {

                console.log(data)
                this.SalesOwnerPerson = data
            });

        this._service.getOpportunityCreatdby(this.selectedDropDown.Indusrtyid, this.selectedDropDown.IndusrtyTypeid, this.selectedDropDown.countryid, this.selectedDropDown.cityid, this.selectedDropDown.Designationid, this.selectedDropDown.ContactPersonid, this.selectedDropDown.SalesOwnerPersonid).subscribe(
            data => {

                console.log(data)
                this.OppoCreatedBy = data
            });

        this._service.getProduct(this.selectedDropDown.Indusrtyid, this.selectedDropDown.IndusrtyTypeid, this.selectedDropDown.countryid, this.selectedDropDown.cityid, this.selectedDropDown.Designationid, this.selectedDropDown.ContactPersonid, this.selectedDropDown.SalesOwnerPersonid, this.selectedDropDown.OppoCreatedByid).subscribe(
            data => {
                debugger;
                console.log(data)
                this.Product = data
            });

        this._service.getOppoclassification(this.selectedDropDown.Indusrtyid, this.selectedDropDown.IndusrtyTypeid, this.selectedDropDown.countryid, this.selectedDropDown.cityid, this.selectedDropDown.Designationid, this.selectedDropDown.ContactPersonid, this.selectedDropDown.SalesOwnerPersonid, this.selectedDropDown.OppoCreatedByid, this.selectedDropDown.Productid).subscribe(
            data => {
                debugger;
                console.log(data)
                this.OpporClassification = data
            });


       
    }

    onDesignationChange(DesignationId) {
        debugger;
     
        this.selectedDropDown.Designationid = DesignationId.values;

        if (this.selectedDropDown.Designationid == 'undefined' || this.selectedDropDown.Designationid == '' || this.selectedDropDown.Designationid == null) {

            this.selectedDropDown.Designationid = "0";
        }
       


        this._service.getContactPerson(this.selectedDropDown.Indusrtyid, this.selectedDropDown.IndusrtyTypeid, this.selectedDropDown.countryid, this.selectedDropDown.cityid, this.selectedDropDown.Designationid).subscribe(
            data => {
                console.log(data)
                this.ContactPerson = data
            });

    }

    
    //onOppoChange(oppocreatedbyid) {
    //    debugger;

    //    this.selectedDropDown.OppoCreatedByid = oppocreatedbyid.values;

      
    //    this._service.getContactPerson(this.selectedDropDown.Indusrtyid, this.selectedDropDown.IndusrtyTypeid, this.selectedDropDown.countryid, this.selectedDropDown.cityid, this.selectedDropDown.Designationid).subscribe(
    //        data => {
    //            console.log(data)
    //            this.ContactPerson = data
    //        });

    //}

    FilterbyIds() {
        debugger;
        if (this.selectedDropDown.countryid == 'undefined' || this.selectedDropDown.countryid == '' || this.selectedDropDown.countryid == null) {

            this.selectedDropDown.countryid = "0";
        }
        if (this.selectedDropDown.cityid == 'undefined' || this.selectedDropDown.cityid == '' || this.selectedDropDown.cityid == null) {

            this.selectedDropDown.cityid = "0";
        }
        if (this.selectedDropDown.IndusrtyTypeid == 'undefined' || this.selectedDropDown.IndusrtyTypeid == '' || this.selectedDropDown.IndusrtyTypeid == null) {

            this.selectedDropDown.IndusrtyTypeid = "0";
        }
        if (this.selectedDropDown.Indusrtyid == 'undefined' || this.selectedDropDown.Indusrtyid == '' || this.selectedDropDown.Indusrtyid == null) {

            this.selectedDropDown.Indusrtyid = "0";
        }
        if (this.selectedDropDown.Designationid == 'undefined' || this.selectedDropDown.Designationid == '' || this.selectedDropDown.Designationid == null) {

            this.selectedDropDown.Designationid = "0";
        }
        if (this.selectedDropDown.ContactPersonid == 'undefined' || this.selectedDropDown.ContactPersonid == '' || this.selectedDropDown.ContactPersonid == null) {

            this.selectedDropDown.ContactPersonid = "0";
        }
        if (this.selectedDropDown.SalesOwnerPersonid == 'undefined' || this.selectedDropDown.SalesOwnerPersonid == '' || this.selectedDropDown.SalesOwnerPersonid == null) {

            this.selectedDropDown.SalesOwnerPersonid = "0";
        }
        if (this.selectedDropDown.Productid == 'undefined' || this.selectedDropDown.Productid == '' || this.selectedDropDown.Productid == null) {

            this.selectedDropDown.Productid = "0";
        }
        if (this.selectedDropDown.OpporClassificationid == 'undefined' || this.selectedDropDown.OpporClassificationid == '' || this.selectedDropDown.OpporClassificationid == null) {

            this.selectedDropDown.OpporClassificationid = "0";
        }
        if (this.selectedDropDown.OppoCreatedByid == 'undefined' || this.selectedDropDown.OppoCreatedByid == '' || this.selectedDropDown.OppoCreatedByid == null) {

            this.selectedDropDown.OppoCreatedByid = "0";
        }
        if (this.selectedDropDown.OCPIds == 'undefined' || this.selectedDropDown.OCPIds == '' || this.selectedDropDown.OCPIds == null) {

            this.selectedDropDown.OCPIds = "0";
        }


        this._service.getFilterGridbyids(this.selectedDropDown.countryid, this.selectedDropDown.cityid, this.selectedDropDown.IndusrtyTypeid, this.selectedDropDown.Indusrtyid, this.selectedDropDown.Designationid, this.selectedDropDown.ContactPersonid, this.selectedDropDown.SalesOwnerPersonid, this.selectedDropDown.Productid, this.selectedDropDown.OpporClassificationid, this.selectedDropDown.OppoCreatedByid, this.selectedDropDown.OCPIds).subscribe(
            data => {
                console.log(data)
                this.ContactPersonGrid = data
                if (data.length > 0) {
                    this.showGrid = false;
                }
                else {
                    this.showGrid = true;
                }
            });



    }




    loadLabels(): void {
        this._userService.get('api/LabelsFetching/LabelsFetching?CompanyId=&Culture=en-GB&code=&formid=Campaign')

            .subscribe(label => {

                this.Customizelabels = label;
            });
    }


}

class selectedDropDownsValue {
    countryid: any;
    cityid: any;
    Productid: any;
    IndusrtyTypeid: any;
    Indusrtyid: any;
    OpporClassificationid: any;
    Designationid: any;
    ContactPersonid: any;
    SalesOwnerPersonid: any;
    OppoCreatedByid: any;
    OCPIds: any;
}


