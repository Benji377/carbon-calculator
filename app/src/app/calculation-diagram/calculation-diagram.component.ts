import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Calculation } from '../emissionmodule/calculation';
import { CalculationService } from '../_services/calculation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';
import { DiagramData, MenuService } from '../shared';

@Component({
  selector: 'app-calculation-diagram',
  templateUrl: './calculation-diagram.component.html',
  styleUrls: ['./calculation-diagram.component.scss']
})
export class CalculationDiagramComponent implements OnInit {

	private calculation: Calculation | undefined;
	data: DiagramData[] = [];

	constructor(
		private calculationService: CalculationService,
		private activatedRoute: ActivatedRoute,
		private translateService: TranslateService,
		private translationManager: TranslationManagerService,
		private menuService: MenuService
	) {
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			const title = params['title'] as unknown;
			this.translateService.get("compare").subscribe(translation => {
				this.menuService.changeMenu([{icon:"bar_chart", menuPointName: translation, link: `/emission/${title}/diagram/compare`}]);
			});
			if (typeof title !== "string") throw new Error("Title not of type string (this should not occur)");
			this.calculation = this.calculationService.getByName(title);
			this.loadChart();
		});
	}

	loadChart() {
		if(this.calculation == null) {
			this.data = [];
			return;
		}
		this.translateService.getTranslation(this.translationManager.lang).subscribe(translations => {
			//TODO: case for 0 len
			if(this.calculation == null) return;
			this.data = this.calculation.modules.map((mod) => ({ name: this.translationManager.getTranslation(translations, "modules." + mod.id), value: Math.floor(mod.calculate() * 100) / 100 }));
		});
	}
}
