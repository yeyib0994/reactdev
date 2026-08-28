import React, { useReducer } from 'react';

type FormData = {
  username: string;
  email: string;
  password: string;
  phone: string;
};

type FormErrors = {
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
};

type FormState = {
  formData: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  submitSuccess: boolean;
};

type Action =
  | { type: 'UPDATE_FIELD'; payload: { name: keyof FormData; value: string } }
  | { type: 'SET_ERRORS'; payload: FormErrors }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_FAIL' }
  | { type: 'RESET_FORM' };

const initialFormState: FormState = {
  formData: {
    username: '',
    email: '',
    password: '',
    phone: '',
  },
  errors: {},
  isSubmitting: false,
  submitSuccess: false,
};

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const { name, value } = action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: '',
        },
        submitSuccess: false,
      };
    }
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };
    case 'SUBMIT_START':
      return {
        ...state,
        isSubmitting: true,
        errors: {},
      };
    case 'SUBMIT_SUCCESS':
      return { ...initialFormState, submitSuccess: true };
    case 'SUBMIT_FAIL':
      return {
        ...state,
        isSubmitting: false,
      };
    case 'RESET_FORM':
      return { ...initialFormState };
    default:
      return state;
  }
}

function validateForm(formData: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!formData.username.trim()) {
    errors.username = '用户名不能为空';
  } else if (formData.username.length < 3) {
    errors.username = '用户名至少3位字符';
  }

  if (!formData.email.trim()) {
    errors.email = '邮箱不能为空';
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(formData.email)) {
    errors.email = '邮箱格式不正确';
  }

  if (!formData.password) {
    errors.password = '密码不能为空';
  } else if (formData.password.length < 6) {
    errors.password = '密码不能少于6位';
  }

  if (!formData.phone.trim()) {
    errors.phone = '手机号不能为空';
  } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
    errors.phone = '手机号格式错误';
  }
  return errors;
}

export default function ComplexRegisterForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const { formData, errors, isSubmitting, submitSuccess } = state;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { name: name as keyof FormData, value },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validateErr = validateForm(formData);
    if (Object.keys(validateErr).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: validateErr });
      return;
    }

    dispatch({ type: 'SUBMIT_START' });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('提交表单数据：', formData);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'SUBMIT_FAIL' });
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: 24 }}>
      <h2>用户注册（useReducer复杂表单）</h2>

      {submitSuccess && (
        <div style={{ color: 'green', marginBottom: 16 }}>
          ✅ 注册提交成功！
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 14 }}>
          <label>用户名：</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={isSubmitting}
            style={{ width: '100%', marginTop: 6, padding: 6 }}
          />
          {errors.username && (
            <div style={{ color: 'red', fontSize: 13 }}>{errors.username}</div>
          )}
        </div>

        <div style={{ marginBottom: 14 }}>
          <label>邮箱：</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isSubmitting}
            style={{ width: '100%', marginTop: 6, padding: 6 }}
          />
          {errors.email && (
            <div style={{ color: 'red', fontSize: 13 }}>{errors.email}</div>
          )}
        </div>

        <div style={{ marginBottom: 14 }}>
          <label>密码：</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={isSubmitting}
            style={{ width: '100%', marginTop: 6, padding: 6 }}
          />
          {errors.password && (
            <div style={{ color: 'red', fontSize: 13 }}>{errors.password}</div>
          )}
        </div>

        <div style={{ marginBottom: 14 }}>
          <label>手机号：</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={isSubmitting}
            style={{ width: '100%', marginTop: 6, padding: 6 }}
          />
          {errors.phone && (
            <div style={{ color: 'red', fontSize: 13 }}>{errors.phone}</div>
          )}
        </div>

        <div style={{ marginTop: 20 }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{ padding: '8px 16px', marginRight: 12 }}
          >
            {isSubmitting ? '提交中...' : '提交注册'}
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'RESET_FORM' })}
            disabled={isSubmitting}
            style={{ padding: '8px 16px' }}
          >
            重置表单
          </button>
        </div>
      </form>
    </div>
  );
}
