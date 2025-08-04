// import styled from 'styled-components';
// import { breakpoint } from '../../../../constants';

// export const FieldTextContainer = styled.div<{ hasError?: boolean }>`
//   display: flex;
//   flex-direction: column;
//   gap: 6px;

//   label {
//     font-size: 14px;
//     font-style: normal;
//     font-weight: 500;
//     span {
//       color: red;
//     }
//   }

//   .input-container {
//     display: flex;
//     align-items: center;
//     height: 43px;
//     padding: 14px 12px;
//     border-radius: 8px;
//     /* background-color: red !important; */
//     gap: 6px;
//     border: 1px solid var(--border-color);
//     border-color: ${(props) =>
//       props.hasError ? 'red !important' : 'var(--border-color)'};
//     transition: all 150ms ease-in-out;
//     position: relative;

//     input::placeholder {
//       color: rgba(134, 134, 134, 0.6);
//     }

//     &.textarea {
//       height: unset;
//       min-height: 43px;
//     }

//     &:focus-within {
//       border-width: 1.5px;
//       border-color: #c2c3c6;
//       box-shadow: ${(props) =>
//         props.hasError
//           ? '0 0 2px 2px red !important'
//           : '0 0 2px 2px var(--primary-color)'};
//     }

//     &.disabled {
//       background-color: var(--empty-bg-color) !important;
//       cursor: not-allowed !important;
//       input {
//         cursor: not-allowed !important;
//       }
//     }

//     .start-icon {
//       display: flex;
//       align-items: center;
//       svg {
//         width: 16px;
//         height: 16px;
//         path {
//           fill: var(--text-color);
//         }
//       }
//     }

//     .currency-icon {
//       display: flex;
//       align-items: center;
//       pointer-events: none; // Prevent icon from blocking input focus
//     }

//     .password-icon {
//       position: absolute;
//       top: 50%;
//       transform: translateY(-50%);
//       right: 10px;
//       cursor: pointer;
//       svg path {
//         fill: var(--text-color);
//       }
//     }

//     textarea,
//     input {
//       width: 100%;
//       padding: 0;
//       font-size: 14px;
//       font-style: normal;
//       font-weight: 400;
//       border: 0;
//       outline: 0;
//       box-shadow: unset !important;
//       background-color: transparent !important;
//       color: var(--text-color);
//     }
//   }

//   .error-container {
//     font-size: 13px;
//     color: red;
//   }

//   @media (max-width: ${breakpoint.mobile}px) {
//     gap: 4px;
//     label {
//       font-size: 10px;
//     }
//     .input-container {
//       height: 36px;
//       padding: 8px 10px;
//       gap: 4px;

//       &.textarea {
//         height: unset;
//         min-height: 36px;
//       }

//       textarea,
//       input {
//         font-size: 10px;
//       }
//     }

//     .error-container {
//       font-size: 9px;
//     }
//   }
// `;
