import { PictureView } from "../models/PictureView.model";
import { Subject } from "rxjs/Subject";

export class PictureViewService {
    private pictureViewList: PictureView[] = [];
    pictureViewList$ = new Subject<PictureView[]>();

    emitList() {
        this.pictureViewList$.next(this.pictureViewList);
    }

    addPictureView(view: PictureView) {
        this.pictureViewList.push(view);
        this.emitList();
    }
}