function makeEditable(element) {
                    const originalText = element.textContent;
                    const inputField = document.createElement('input');
                    inputField.setAttribute('type', 'text');
                    inputField.setAttribute('value', originalText);

                    inputField.addEventListener('blur', () => {
                      const newText = inputField.value.trim();
                      if (newText !== originalText && newText !== '') {
                        const taskId = element.dataset.taskId;
                        fetch(`/edit_task/${taskId}/`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-CSRFToken': '{{ csrf_token }}',
                          },
                          body: `updated_task_name=${newText}`,
                        }).then(response => {
                          if (response.ok) {
                            element.textContent = newText;
                          } else {
                            element.textContent = originalText;
                          }
                        }).catch(error => {
                          console.error('Error:', error);
                          element.textContent = originalText;
                        });
                      } else {
                        element.textContent = originalText;
                      }
                    });

                    element.textContent = '';
                    element.appendChild(inputField);
                    inputField.focus();
}
                  function deleteTask(taskId) {
                        fetch(`/delete/${taskId}/`, {
                          method: 'POST', // Sending a POST request to delete
                          headers: {
                            'X-CSRFToken': '{{ csrf_token }}', // Include the CSRF token
                          },
                        })
                          .then(response => {
                            if (response.ok) {
                              window.location.href = '{% url "home-page" %}'; // Redirect to the home page after successful deletion
                            } else {
                              console.error('Failed to delete task');
                            }
                          })
                          .catch(error => {
                            console.error('Error:', error);
                          });
                      }