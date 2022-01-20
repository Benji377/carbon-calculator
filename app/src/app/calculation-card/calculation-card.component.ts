import { Component, Input, OnInit } from '@angular/core';
import { EmissionModule, FactorEmissionModule } from '../emissionmodule/emission-module';

interface CalculationCardData{
  number: string,
  result: string
}

@Component({
  selector: 'app-calculation-card',
  templateUrl: './calculation-card.component.html',
  styleUrls: ['./calculation-card.component.scss']
})
export class CalculationCardComponent implements OnInit {

  @Input() edit: boolean = true;

  @Input() module!: EmissionModule;
  
  ngOnInit(): void {}

  get data(): CalculationCardData[] {

    let number: number = 0;
    
    if(this.module instanceof FactorEmissionModule){
      number = (this.module as FactorEmissionModule).number;
    }

    return [{ number: number as unknown as string, result: this.module?.calculate().toFixed(2) as unknown as string }];
  }
}
