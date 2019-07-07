import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PopularityGreedChartService {

  constructor(public http: HttpClient) { }

  getData = () => {
    return this.http.get(`${explorerUrl}?sql=${sqlQueryString}`);
  }
}

const sqlQueryString = 'SELECT%0A%20%20%20%20localized_name%2C%0A%20%20%20%20RATIO%3A%3AFLOAT%2C%0A%20%20%20%20HERO_PICK_RATE%3A%3AFLOAT%20%2F%20MATCHES_AMOUNT%20as%20POPULARITY%2C%0A%20%20%20%20MATCHES_AMOUNT%3A%3AINTEGER%2C%0A%20%20%20%20AVG_HERO_GPM%3A%3AFLOAT%2C%0A%20%20%20%20AVG_TEAM_GPM%3A%3AFLOAT%0AFROM%20(%0A%20%20%20%20SELECT%20%0A%20%20%20%20%20%20%20%20hero_id%2C%0A%20%20%20%20%20%20%20%20avg(gold_per_min)%20%2F%20avg(AVG_TEAM_GOLD)%20as%20RATIO%2C%0A%20%20%20%20%20%20%20%20avg(gold_per_min)%20as%20AVG_HERO_GPM%2C%0A%20%20%20%20%20%20%20%20avg(AVG_TEAM_GOLD)%20as%20AVG_TEAM_GPM%0A%20%20%20%20FROM%0A%20%20%20%20(%0A%20%20%20%20%20%20%20%20SELECT%0A%20%20%20%20%20%20%20%20%20%20%20%20match_id%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20avg(gold_per_min)%20as%20AVG_TEAM_GOLD%0A%20%20%20%20%20%20%20%20FROM%20%0A%20%20%20%20%20%20%20%20%20%20%20%20player_matches%0A%20%20%20%20%20%20%20%20GROUP%20BY%0A%20%20%20%20%20%20%20%20%20%20%20%20match_id%0A%20%20%20%20%20%20%20%20)%20as%20avg_gpm_table%0A%20%20%20%20RIGHT%20JOIN%0A%20%20%20%20%20%20%20%20player_matches%20ON%20avg_gpm_table.match_id%20%3D%20player_matches.match_id%0A%20%20%20%20GROUP%20BY%20%0A%20%20%20%20%20%20%20%20hero_id%0A%20%20%20%20ORDER%20BY%20%0A%20%20%20%20%20%20%20%20RATIO%20DESC%0A%20%20%20%20LIMIT%20%0A%20%20%20%20%20%20%20%20117%0A)%20as%20main_table%0ALEFT%20JOIN%0A%20%20%20%20(%0A%20%20%20%20%20%20%20%20SELECT%0A%20%20%20%20%20%20%20%20%20%20%20%20hero_id%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20count(hero_id)%20as%20HERO_PICK_RATE%0A%20%20%20%20%20%20%20%20FROM%20%0A%20%20%20%20%20%20%20%20%20%20%20%20player_matches%0A%20%20%20%20%20%20%20%20GROUP%20BY%0A%20%20%20%20%20%20%20%20%20%20%20%20hero_id%0A)%20as%20popularity_table%20ON%20popularity_table.hero_id%20%3D%20main_table.hero_id%0ALEFT%20JOIN%0A%20%20%20%20(%0A%20%20%20%20%20%20%20%20SELECT%0A%20%20%20%20%20%20%20%20%20%20%20%20count(match_id)%20as%20MATCHES_AMOUNT%0A%20%20%20%20%20%20%20%20FROM%0A%20%20%20%20%20%20%20%20%20%20%20%20matches%0A)%20as%20matches_amount_table%20ON%20TRUE%0ALEFT%20JOIN%0A%20%20%20%20heroes%0AON%20heroes.id%20%3D%20main_table.hero_id';
const explorerUrl = 'https://api.opendota.com/api/explorer';
