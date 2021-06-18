import { Component } from '@angular/core';
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
    {name:'Upcoming', value:'Upcoming'},
    {name:'Archived', value:'Archived'},
    {name:'All Time Favorites', value:'ALL_TIME_FAVORITES'}
  ]

  tags = new FormControl();
  allTags: any[];
	selectedTagIds: any[] = [];

  eventTag: any = 'ALL_EVENTS';
  selectedSubCtgId: any = 'Upcoming';
  eventCards:any[] = [];
  activeSubCtgId: number;
  pageCount=1;
  TotalRecords: any;
  Page = 1;
  offsetCount = 0;
  max=20;

  constructor(private http: HttpClient) { 
    this.showEventCards();
  }

  ngOnInit(): void{
     this.http.get<any>(this.tagsApi).subscribe((data: any) => {
        this.allTags = [...data.data.tags];
      },
      (error) => {
        console.error('There was an error!', error);
      }
    )
  }   
   
  showEventCards(){
    this.http.get<any>(this.listApi+'?event_category='+this.eventTag+'&event_sub_category='+this.selectedSubCtgId+'&tag_list='+this.selectedTagIds+'&offset='+this.offsetCount)    
    .subscribe((res: any) =>{
      console.log(res)
      this.pageCount = res.data.page_count; 
      this.TotalRecords = res.data.events.length;
      this.eventCards=res.data.events
    })
  }
  
  showActiveTab(tag: any){
    this.eventTag = tag;
    this.selectedSubCtgId = 'Upcoming'; 
    console.log(this.eventTag)
    this.Page = 1;
    this.showEventCards();
  }

  selectedTag(e:any){
    this.selectedTagIds.push(e);
    this.showEventCards();
  }

  selectedSubCtg(ctg: any){
    this.selectedSubCtgId = ctg;
    // console.log('ctg -', this.selectedSubCtgId)
    this.showEventCards();
  }

  changeOffset(){
    this.offsetCount = (this.Page-1)*this.max;
    // console.log('offset count - ', this.offsetCount)
    this.showEventCards();
  }
}
