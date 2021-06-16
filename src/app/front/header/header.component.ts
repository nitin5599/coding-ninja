import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  Tabs:any[] = [
    {name:'All Events', value:'ALL_EVENTS', status:'active', show:'show'},
    {name:'Webinars', value:'WEBINAR', status:'', show:''},
    {name:'Coding Events', value:'CODING_EVENT', status:'', show:''},
    {name:'Bootcamp Events', value:'BOOTCAMP_EVENT', status:'', show:''},
    {name:'Workshop', value:'WORKSHOP', status:'', show:''},
  ]

  subCtg:any[] = [
    {name:'All Time Favorites', value:'ALL_TIME_FAVORITES'},
    {name:'Archived', value:'Archived'},
    {name:'Upcoming', value:'Upcoming'},
  ]

  allTags: any[];
	selectedTagIds: any[] = ['Career Guidance'];

  tagsApi = 'https://api.codingninjas.com/api/v3/event_tags';
  listApi = 'https://api.codingninjas.com/api/v3/events';
  eventTag: any = 'ALL_EVENTS';
  selectedSubCtgId: any = 'Upcoming';
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(this.tagsApi).subscribe((data: any) => {
          // console.log(data)
          this.allTags = [...data.data.tags];
      },
      (error) => {
          console.error('There was an error!', error);
      }
    )
    this.showEventCards();
  }

  showEventCards(){
    this.http.get<any>(this.listApi+'?event_category='+this.eventTag+'&event_sub_category='+this.selectedSubCtgId+'&tag_list='+this.selectedTagIds+'&offset=0').subscribe((data: any) =>{
      console.log(data);
    })
  }

  showActiveTab(tag: any){
    this.eventTag = tag;
    this.showEventCards();
  }

  selectedTag(){
    console.log(this.selectedTagIds);
    this.showEventCards();
  }
  
  selectedSubCtg(){
    console.log('ctg -', this.selectedSubCtgId)
    this.showEventCards();
  }

  onSelectAll() {
		this.selectedTagIds = this.allTags;
    this.selectedTag();
	}

	onClearAll() {
		this.selectedTagIds = [];
    this.selectedTag();
	}

}
