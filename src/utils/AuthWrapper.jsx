import * as React from 'react';
import { connect } from 'react-redux';
import hoistStatics from './HoistNonReactStatistics';

export function UserAuthWrapper(args) {
  const { authSelector, predicate, failureRedirectPath,  wrapperDisplayName } = args;
  const isAuthenticated = (authData) => predicate(authData)
  const ensureAuth = ({ location, authData }, loginPath, redirect) => {
    let query = { redirect: `${location.pathname}${location.search}` }
    if (!isAuthenticated(authData)) {
      redirect({
        pathname: loginPath,
        query
      })
    }
  }

  return function wrapComponent(DecoratedComponent, failureRedirectPath) {
    const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component'
    const loginPath = failureRedirectPath || '/login';

    class UserAuthWrapper extends React.Component {

      static displayName = `${wrapperDisplayName}(${displayName})`;

      context: {
        router: any
      }
      static contextTypes: React.ValidationMap<any> = {
        router: React.PropTypes.object
      };

      constructor(props, context) {
        super(props, context);
        this.getRedirectFunc = this.getRedirectFunc.bind(this);
      }

      componentWillMount() {
        ensureAuth(this.props, loginPath,  this.getRedirectFunc(this.props))
      }

      componentWillReceiveProps(nextProps) {
        ensureAuth(nextProps, loginPath, this.getRedirectFunc(nextProps))
      }

      getRedirectFunc(props) {
        return (props.redirect !== undefined) ? props.redirect : this.context.router.replace;
      }

      render() {
        if (isAuthenticated(this.props.authData)) {
          return <DecoratedComponent {...this.props} />
        } else {
          return <div/>
        }
      }
    }

    function mapStateToProps(state, ownProps) {
      return {
        authData: authSelector(state, ownProps, false)
      }
    }

    const HoistedComponent = hoistStatics(UserAuthWrapper, DecoratedComponent);
    return connect(mapStateToProps)(HoistedComponent);
  }
}


export const requireAuth = UserAuthWrapper({
  authSelector: state => state.authReducer,
  predicate: auth => auth.isAuthenticated === true,
  wrapperDisplayName: 'UserIsAuthenticated'
});
