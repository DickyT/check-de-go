import * as React from 'react';


export default class CheckBack extends React.Component<{}, {}> {
  render() {
    return (
      <div className="check-back">
        <div className="content">
          <div className="endorse-info">
            <div className="endorse-label">ENDORSE HERE</div>
            <div className="endorse-warn-space">
              <p className="endorse-warn">
                DO NOT WRITE, STAMP, OR SIGN BELOW THIS LINE
              </p>
              <p className="endorse-final-warn">
                RESERVED FOR FINANCIAL INSTITUTION USE
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
