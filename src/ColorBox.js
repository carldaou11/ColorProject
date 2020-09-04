import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import styles from "./styles/ColorBoxStyles";
import { withStyles } from "@material-ui/styles";
import classnames from "classnames";

class ColorBox extends Component {
    state = {
        copied: false,
    };

    changeCopyState = () => {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        });
    };

    render() {
        const {
            name,
            background,
            moreUrl,
            showingFullPalette,
            classes,
        } = this.props;
        const { copied } = this.state;

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div
                    style={{ background: background }}
                    className={classes.ColorBox}
                >
                    <div
                        style={{ background: background }}
                        className={classnames(classes.copyOverlay, {
                            [classes.showOverlay]: copied,
                        })}
                    />
                    <div
                        className={classnames(classes.copyMessage, {
                            [classes.showMessage]: copied,
                        })}
                    >
                        <h1>copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette && (
                        <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMore}>MORE</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);