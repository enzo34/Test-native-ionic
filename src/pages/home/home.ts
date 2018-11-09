import { Component, OnDestroy, OnInit } from '@angular/core';
import { PictureView } from '../../models/PictureView.model';
import { Subscription } from 'rxjs/Subscription';
import { PictureViewService } from '../../services/pictureView.service';
import { NewViewPage } from '../new-view/new-view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy{
  pictureViewList: PictureView[];
  pictureViewListSubscription: Subscription;
  newViewPage = NewViewPage;

  constructor(private pictureViewService: PictureViewService) {

  }

  ngOnInit() {
    this.pictureViewListSubscription = this.pictureViewService.pictureViewList$.subscribe(
      (pictureViews: PictureView[]) => {
        this.pictureViewList = pictureViews;
      }
    );
    this.pictureViewService.emitList();
  }

  ngOnDestroy() {
    this.pictureViewListSubscription.unsubscribe();
  }

}
