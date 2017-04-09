import Axios from 'axios';

class AxiosApi {

    static axiosInst = null ;

    static updateAxiosInstnace(config: any): any {
        this.createInstance(config);
    }

    static getAxiosInstance(config?: any): any {
        return (AxiosApi.axiosInst) ? AxiosApi.axiosInst : AxiosApi.createInstance(config);
    }

    static createInstance(config: any) {
      config = config || {};
      let headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      };
      if (config) {
          headers = Object.assign({}, headers, config);
      }
      AxiosApi.axiosInst = Axios.create({
          baseURL: '',
          timeout: 60000,
          headers: headers
      });

      AxiosApi.axiosInst.interceptors.response.use(
          (resp) => resp,
          (err) => {
              this.handleError(err);
              return Promise.reject(err);
          });

          return AxiosApi.axiosInst;
    }

	/**
		Make a get request.
		url:relative url.
		data: data to pass as the parameter
		onSuccess: method to call on success with result
		onError: method to call on error if any error.
	*/
    static get(url: string, data: Object,
        onSuccess: (result: any) => any,
        onError?: (result: any) => any): void {

        this.getAxiosInstance().get(url, data)
            .then(function(response) {
                if (onSuccess !== undefined) {
                    onSuccess(response);
                }
            }).catch(function(response) {
                if (onError !== undefined) {
                    onError(response);
                }
            });
    }

    static post(url: string, data: Object, onSuccess: (result: any) => any, onError?: (result: any) => any, businessId?: string): void {

        this.getAxiosInstance().post(url, data).then(function(response) {
            if (onSuccess !== undefined) {
                onSuccess(response);
            }
        }).catch(function(response) {
            if (onError !== undefined) {
                onError(response);
            }
        });
    }

	/**
		common interceptor method to display error messages accros the form.
	*/
    static handleError(error) {
      if (error.response) {
        //do something with error
      }
    }
}

export default AxiosApi;
