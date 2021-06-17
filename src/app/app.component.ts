import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  tagsApi = 'https://api.codingninjas.com/api/v3/event_tags';
  listApi = 'https://api.codingninjas.com/api/v3/events';

  Tabs:any[] = [
    {name:'All Events', value:'ALL_EVENTS', status:'active', show:'show'},
    {name:'Webinars', value:'WEBINAR', status:'', show:''},
    {name:'Coding Events', value:'CODING_EVENT', status:'', show:''},
    {name:'Bootcamp Events', value:'BOOTCAMP_EVENT', status:'', show:''},
    {name:'Workshop', value:'WORKSHOP', status:'', show:''},
  ]

  subCtg:any[] = [
    {name:'All Time Favorites', value:'ALL_TIME_FAVORITES', status:'active'},
    {name:'Archived', value:'Archived', status:''},
    {name:'Upcoming', value:'Upcoming', status:''},
  ]

  tags = new FormControl();
  allTags: any[];
	selectedTagIds: any[] = [];

  eventTag: any = 'ALL_EVENTS';
  selectedSubCtgId: any = 'Upcoming';
  eventCards:any[] = [];
  activeSubCtgId: number;
  pageCount;
  TotalRecords: any;
  Page = 1;
  
  constructor(private http: HttpClient) { 
    this.showEventCards();
  }

  async ngOnInit(): Promise<void> {
     this.http.get<any>(this.tagsApi).subscribe((data: any) => {
        this.allTags = [...data.data.tags];
      },
      (error) => {
        console.error('There was an error!', error);
      }
    )
  }

  showEventCards(){
    this.http.get<any>(this.listApi+'?event_category='+this.eventTag+'&event_sub_category='+this.selectedSubCtgId+'&tag_list='+this.selectedTagIds+'&offset=0')    
    .subscribe((res: any) =>{
        this.pageCount = res.data.page_count;
        this.TotalRecords = res.data.events.length;
        this.eventCards=res.data.events
      })
  }
  
  showActiveTab(tag: any){
    this.eventTag = tag;
    this.showEventCards();
  }

  selectedTag(e:any){
    this.selectedTagIds.push(e);
    // console.log('Tags - ',this.selectedTagIds);
    this.showEventCards();
  }

  selectedSubCtg(ctg: any){
    this.selectedSubCtgId = ctg;
    // console.log('ctg -', this.selectedSubCtgId)
    this.showEventCards();
  }

}
