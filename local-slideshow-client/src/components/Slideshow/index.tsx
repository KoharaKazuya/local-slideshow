/*

スライド (PDF) を表示するエリア

*/

import { connect, Dispatch } from "react-redux";
import { Slideshow as StatelessSlideshow, SlideProps, ArrowKeyDirection } from "./Slideshow";

import { RootState } from "../../modules";
import { setSlideInfo, prevPage, nextPage } from "../../modules/slide";

const mapStateToProps = (rootState: RootState) => ({
  slideFileData: rootState.slide.fileData,
  page: rootState.slide.page,
});
const dispatchToProps = {
  onSlideReady: (info: SlideProps) => setSlideInfo(info.numOfPages),
  onArrowKeyPress(dir: ArrowKeyDirection) {
    switch (dir) {
      case ArrowKeyDirection.LEFT:
      case ArrowKeyDirection.UP:
        return prevPage();
      case ArrowKeyDirection.RIGHT:
      case ArrowKeyDirection.DOWN:
        return nextPage();
    }
  },
};

export const Slideshow = connect(mapStateToProps, dispatchToProps)(StatelessSlideshow);
