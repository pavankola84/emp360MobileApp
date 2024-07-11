import axios, {AxiosResponse} from 'axios';
import {
  EMP_HOBBIES_FORM_ID,
  EMP_LEAVES_FORM_ID,
  EMP_MY_LEAVES_FORM_ID,
  EMP_PERSONAL_PROFILE_FORM_ID,
  EMP_PROFILE_FORM_ID,
  EMP_SUMMARY_FORM_ID,
  REACT_APP_API_GATEWAY_URL,
} from '../constants';
import {
  Form_RUNTIME_DATA,
  ACCOUNT_USERS,
  APPLY_LEAVE,
  CANCEL_LEAVE,
  DECISION_REJECT,
  COMB_OFF_DATA,
  COMB_OFF_DECISION,
  Form_DATA,
} from '../endpoints';

export interface ApiResponse<T> {
  success: boolean;
  data?: any;
  message?: string;
}

export const fetchDataUsingFormId = async (
  emailId: string,
  token: string,
  formId: string,
): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}${Form_RUNTIME_DATA}${formId}&page=0&size=10000&filter=formData.officialEmail:${emailId}`;
    const response: AxiosResponse<any> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return {success: true, data: response.data.data};
    } else {
      return {success: false, message: 'Failed to fetch data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};

export const fetchLeavesData = async (
  emailId: string,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}${Form_RUNTIME_DATA}${EMP_LEAVES_FORM_ID}&page=0&size=10000&filter=formData.officialEmail:${emailId}`;
    const response: AxiosResponse<any> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return {success: true, data: response.data.data};
    } else {
      return {success: false, message: 'Failed to fetch data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};

export const fetchProfilePicture = async (
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}${ACCOUNT_USERS}/preferences`;
    const response: AxiosResponse<any> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return {success: true, data: response.data.data};
    } else {
      return {success: false, message: 'Failed to fetch data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};

export const postProfilePicture = async (
  token: string,
  formData: FormData,
): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}${ACCOUNT_USERS}/preferences/profile-picture`;
    const response: AxiosResponse<any> = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return {success: true, data: response.data.data};
    } else {
      return {success: false, message: 'Failed to Post data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};

export const fetchUsers = async (token: string): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}${ACCOUNT_USERS}`;
    const response: AxiosResponse<any> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return {success: true, data: response.data.data};
    } else {
      return {success: false, message: 'Failed to fetch data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};

export const postSummaryHobbiesData = async (
  body: {},
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}${Form_DATA}`;
    const response: AxiosResponse<any> = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {success: false, message: 'Failed to Post data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};

export const applyLeaveEMP = async (
  body: {},
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}${APPLY_LEAVE}`;
    const response: AxiosResponse<any> = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {success: false, message: 'Failed to Post data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};

export const fetchRuntimeFormData = async (
  id: string,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}/form-runtime/v1/form-data?formId=${id}`;
    const response: AxiosResponse<any> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return {success: true, data: response.data.data};
    } else {
      return {success: false, message: 'Failed to fetch data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};

export const fetchMyLeaves = async (
  emailId: string,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}${Form_RUNTIME_DATA}${EMP_MY_LEAVES_FORM_ID}&filter=formData.officialEmail:${emailId}`;
    const response: AxiosResponse<any> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return {success: true, data: response.data.data};
    } else {
      return {success: false, message: 'Failed to fetch data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};

export const cancelLeaveEMP = async (
  token: string,
  id: string,
): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}${CANCEL_LEAVE}${id}`;
    const response: AxiosResponse<any> = await axios.post(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {success: false, message: 'Failed to Post data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};

export const fetchTeamLeavesData = async (
  emailId: string,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}${Form_RUNTIME_DATA}${EMP_MY_LEAVES_FORM_ID}&filter=formData.reportingTo:${emailId}`;
    const response: AxiosResponse<any> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return {success: true, data: response.data.data};
    } else {
      return {success: false, message: 'Failed to fetch data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};

export const submitDecisionReject = async (
  decision: string,
  id: string,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}${DECISION_REJECT}${id}&decision=${decision}`;
    const response: AxiosResponse<any> = await axios.post(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success) {
      return {success: true, data: response.data.data};
    } else {
      return {success: false, message: 'Failed to fetch data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};

export const fetchTeamComboffData = async (
  emailId: string,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}${COMB_OFF_DATA}${emailId}`;
    const response: AxiosResponse<any> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return {success: true, data: response.data.data};
    } else {
      return {success: false, message: 'Failed to fetch data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};

export const submitCombOffDecisionReject = async (
  decision: string,
  id: string,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const url = `${REACT_APP_API_GATEWAY_URL}${COMB_OFF_DECISION}${id}&decision=${decision}`;
    const response: AxiosResponse<any> = await axios.post(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success) {
      return {success: true, data: response.data.data};
    } else {
      return {success: false, message: 'Failed to fetch data'};
    }
  } catch (error: any) {
    return {success: false, message: error.message || 'Unknown error occurred'};
  }
};
