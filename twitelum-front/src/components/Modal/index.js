import React, { Component } from 'react'

class Modal extends Component {
    render() {
        return (
            <div className={`modal ${this.props.isAberto && 'modal--active'}`} onClick={this.props.fechaModal}>
                <div className="modal__wrap">
                                       
                    {
                        this.props.isAberto && 
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}

export default Modal