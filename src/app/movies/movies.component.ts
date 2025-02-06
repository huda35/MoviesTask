import { Component , inject, OnInit,OnDestroy } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Observable, Subscription} from 'rxjs';
import { MovieInterface } from '../movie-interface';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit,OnDestroy {
  ngOnInit(): void {
    this.getMoviesData();
  }
 
  moviesList:MovieInterface[]=[]
  imgUrl:string="https://image.tmdb.org/t/p/original";
  $sub:Subscription=new Subscription();
  private readonly moviesService=inject(MoviesService);
 
  getMoviesData():void{
  this.$sub=this.moviesService.getMovies().subscribe({
      next:(res)=>{
        this.moviesList=res.results;
      },
      error:(err)=>{
        console.log(err);
         
       }
    });
  } 
  ngOnDestroy(): void {
    this.$sub.unsubscribe()
  }
}
