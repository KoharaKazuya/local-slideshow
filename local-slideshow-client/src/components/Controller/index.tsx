/*

スマホ端末でユーザーの (遠隔操作の) 入力を受け付ける画面

*/

import { connect, Dispatch } from "react-redux";
import { Controller as StatelessController } from "./Controller";

import { RootState } from "../../modules";
import { joinRoom } from "../../modules/room";

interface Props {
  /**
   * 操作対象の部屋 ID
   */
  roomId: number;
}

const mapStateToProps = (state: RootState) => ({
  connected: state.room.joinedRoomId !== null,
});
const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: Props) => ({
  onDidMount: () => { dispatch(joinRoom(ownProps.roomId)); },
});

export const Controller = connect<any, any, Props>(
  mapStateToProps, mapDispatchToProps)(StatelessController as any);
