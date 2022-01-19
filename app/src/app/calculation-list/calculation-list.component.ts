import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
import { EmissionModule } from '../emissionmodule/emission-module';
import { MenuService } from '../shared/menu.service';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';

@Component({
  selector: 'app-calculation-list',
  templateUrl: './calculation-list.component.html',
  styleUrls: ['./calculation-list.component.scss']
})
export class CalculationListComponent implements OnInit{
  
  private _calculation!: Calculation;
  private currentUrl!:string;

  constructor(
    private route:ActivatedRoute,
    private navigation:NavigationService,
    private calculationService: CalculationService,
    private menuService:MenuService,
    private translateService: TranslateService
    ){}

  get modules(): EmissionModule[] {
    return this._calculation?.modules;
  }

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      let calculation = this.calculationService.getByName(params.title);
      if(calculation) this._calculation = calculation;
      this.navigation.changeMessage(params?.title);
      this.currentUrl="/emission/" + params.title;
    });

    this.translateService.get("diagrams").subscribe(translation => {
      this.menuService.changeMenu([{icon:"bar_chart", menuPointName: translation, link:this.currentUrl+"/diagram"}]);
    });
  }
}