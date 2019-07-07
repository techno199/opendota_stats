import { Component, OnInit } from '@angular/core';
import { PopularityGreedChartService } from './popularity-greed-chart.service';
import { BehaviorSubject } from 'rxjs';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-popularity-greed-chart',
  templateUrl: './popularity-greed-chart.component.html',
  styleUrls: ['./popularity-greed-chart.component.scss']
})
export class PopularityGreedChartComponent implements OnInit {

  constructor(public popularityGreedChartService: PopularityGreedChartService) { }

  isLoading = false;
  isError = false;
  chartData = new BehaviorSubject<any[]>([]);
  gridData = new BehaviorSubject<GridDataResult[]>([]);
  sort: SortDescriptor[] = [
    {
      field: 'localized_name',
      dir: 'asc'
    }
  ]

  ngOnInit() {
    this.getData();
  }

  handleReloadClick = () => {
    this.getData();
  }

  handleTooltipClick = value => {
    console.log(value);
  }

  handleSortChange = (sort: SortDescriptor[]) => {
    this.sort = sort;
    this.gridData.next(
      orderBy(this.gridData.getValue(), this.sort)
    );
  }
  
  getData = () => {
    this.isLoading = true;
    this.popularityGreedChartService.getData()
      .subscribe((res: ISqlResponse) => {
        console.log(res);
        this.isLoading = false;
        this.isError = false;
        this.chartData.next(res.rows);
        this.gridData.next(
          orderBy(
            res.rows,
            this.sort
          ));
      }, err => {
        console.log(err);
        this.isLoading = false;
        this.isError = true;
      })
  }
}

export interface ISqlResponse {
  command: string;
  rowCount: number;
  oid: string;
  rows: any[];
}
