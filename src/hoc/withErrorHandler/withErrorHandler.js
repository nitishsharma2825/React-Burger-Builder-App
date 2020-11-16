import React,{Component} from 'react'
import Aux from '../auxiliary/auxiliary'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler=(WrappedComponent,axios)=>{
    return class extends Component {
        state={
            error:null,
        }

        componentWillMount=()=>{
            this.reqInterceptors=axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req
            })
            this.respInterceptors=axios.interceptors.response.use(resp=>resp,error=>{
                this.setState({error:error})
            })
        }

        componentWillUnmount=()=>{
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.respInterceptors)
        }

        modalCLoseHandler=()=>{
            this.setState({error:null})
        }
        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} showBackDrop={this.modalCLoseHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler